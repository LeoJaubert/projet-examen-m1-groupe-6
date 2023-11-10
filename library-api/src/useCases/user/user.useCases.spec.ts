import { userFixture } from 'library-api/src/fixtures';
import { UserRepository } from 'library-api/src/repositories';
import {
  adaptUserEntityToPlainUserModel,
  adaptUserEntityToUserModel,
} from 'library-api/src/repositories/user/user.utils';
import { InternalServerError } from 'library-api/src/common/errors';
import { UserUseCases } from './user.useCases';

describe('UserUseCases', () => {
  describe('getAllPlain', () => {
    it('should call repository function', async () => {
      const repository = {
        getAllPlain: jest.fn(),
      } as unknown as UserRepository;
      const useCases = new UserUseCases(repository);
      const fixtures = [userFixture(), userFixture(), userFixture()].map(
        adaptUserEntityToPlainUserModel,
      );

      const getAllSpy = jest
        .spyOn(repository, 'getAllPlain')
        .mockResolvedValue(fixtures);

      const result = await useCases.getAllPlain();

      expect(getAllSpy).toHaveBeenCalledTimes(1);
      expect(getAllSpy).toHaveBeenCalledWith();

      expect(result).toStrictEqual(fixtures);
    });
  });

  describe('getById', () => {
    it('should call repository function', async () => {
      const repository = {
        getById: jest.fn(),
      } as unknown as UserRepository;
      const useCases = new UserUseCases(repository);
      const fixture = adaptUserEntityToPlainUserModel(userFixture());

      const getByIdSpy = jest
        .spyOn(repository, 'getById')
        .mockResolvedValue(fixture);

      const result = await useCases.getById(fixture.id);

      expect(getByIdSpy).toHaveBeenCalledTimes(1);
      expect(getByIdSpy).toHaveBeenCalledWith(fixture.id);

      expect(result).toStrictEqual(fixture);
    });
  });

  describe('create', () => {
    it('should call repository function and return the created user', async () => {
      const repository = {
        create: jest.fn(),
      } as unknown as UserRepository;

      const useCases = new UserUseCases(repository);
      const input = {
        firstname: 'testfirstname',
        lastname: 'testlastname',
      };

      const createdUserEntity = { ...input, id: 'id' };
      const createdUserModel = adaptUserEntityToUserModel(createdUserEntity);

      const createUserSpy = jest
        .spyOn(repository, 'createUser')
        .mockResolvedValue(createdUserEntity);

      const result = await useCases.create(input);

      expect(createUserSpy).toHaveBeenCalledTimes(1);
      expect(createUserSpy).toHaveBeenCalledWith(input);

      expect(result).toStrictEqual(createdUserModel);
    });

    it('should handle repository error during user creation', async () => {
      const repository = {
        create: jest.fn().mockImplementationOnce(() => {
          throw new Error('Repository error');
        }),
      } as unknown as UserRepository;

      const useCases = new UserUseCases(repository);
      const input = {
        username: 'testfirstname',
        password: 'testlastname',
      };

      try {
        await useCases.create(input);
        // If the repository error occurs, the test should not reach here
        expect(true).toBeFalsy();
      } catch (err) {
        expect(err).toBeInstanceOf(InternalServerError);
        expect(err.message).toBe('An error occurred creating a new User');
      }
    });
  });
});
