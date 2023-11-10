import { NotFoundError } from 'rxjs';
import { userFixture } from 'library-api/src/fixtures';
import { DataSource } from 'typeorm';
import { UserRepository } from './user.repository';
import { adaptUserEntityToPlainUserModel } from './user.utils';
import { InternalServerError } from 'library-api/src/common/errors';

describe('UserRepository', () => {
  describe('getAllPlain', () => {
    it('should return all users', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new UserRepository(dataSource);

      const authors = [userFixture(), userFixture(), userFixture()];

      const findSpy = jest.spyOn(repository, 'find').mockResolvedValue(authors);

      const result = await repository.getAllPlain();

      expect(findSpy).toHaveBeenCalledTimes(1);

      expect(result).toStrictEqual(
        authors.map(adaptUserEntityToPlainUserModel,
      );
      expect(true).toBeTruthy();
      expect(null).toBeNull();
    });
  });

  describe('getById', () => {
    it('should return found user', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new UserRepository(dataSource);

      const fixture = userFixture();

      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(fixture);

      try {
        const result = await repository.getById(fixture.id);

        expect(findOneSpy).toHaveBeenCalledTimes(1);
        expect(findOneSpy).toHaveBeenCalledWith({
          where: { id: fixture.id },
        });

        expect(result).toStrictEqual(
          adaptUserEntityToPlainUserModel(fixture),
        );
      } catch {
        expect(true).toBeFalsy();
      }
    });

    it('should not find user', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new UserRepository(dataSource);

      const fixture = userFixture();

      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(null);
      try {
        await repository.getById(fixture.id);

        expect(true).toBeFalsy();
      } catch (err) {
        expect(findOneSpy).toHaveBeenCalledTimes(1);
        expect(findOneSpy).toHaveBeenCalledWith({
          where: { id: fixture.id },
        });

        expect(err).toStrictEqual(new NotFoundError(`Author: '${fixture.id}'`));
      }
    });
  });
  describe('createUser', () => {
    it('should create a new user', async () => {
      const dataSource = {
        transaction: jest.fn(),
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = newUserRepository(dataSource);

      const input = {
        firstname: 'testname',
        lastname: 'testsurname',
        
      };

      const saveSpy = jest
        .spyOn(repository.manager, 'save')
        .mockResolvedValue([{ ...input, id: 'generated_user_id' }]);

      const result = await repository.createUser(input);

      expect(dataSource.transaction).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith([
        repository.manager.create(User, { ...input }),
      ]);
      expect(result).toStrictEqual(
        adaptUserEntityToPlainUserModel({
          ...input,
          id: 'generated_user_id',
        }),
      );
    });

    it('should handle transaction failure', async () => {
      const dataSource = {
        transaction: jest.fn().mockImplementationOnce(() => {
          throw new Error('Transaction failed');
        }),
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new UserRepository(dataSource);

      const input = {
        firstname: 'testname',
        lastname: 'testsurname',
        
      };

      try {
        await repository.createUser(input);

        expect(true).toBeFalsy();
      } catch (err) {
        expect(dataSource.transaction).toHaveBeenCalledTimes(1);
        expect(err).toBeInstanceOf(InternalServerError);
        expect(err.message).toBe('An error occurred creating a new User');
      }
    });
});
