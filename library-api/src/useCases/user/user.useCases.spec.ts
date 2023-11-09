import { userFixture } from 'library-api/src/fixtures';
import { UserRepository } from 'library-api/src/repositories';
import { adaptUserEntityToPlainUserModel } from 'library-api/src/repositories/user/user.utils';
import { UserUseCases } from './user.useCase';

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
});
