import { authorFixture } from 'library-api/src/fixtures';
import { AuthorRepository } from 'library-api/src/repositories';
import { adaptAuthorEntityToPlainAuthorModel } from 'library-api/src/repositories/authors/author.utils';
import { AuthorUseCases } from 'library-api/src/useCases/authors/author.useCases';

describe('AuthorUseCases', () => {
  describe('getAllPlain', () => {
    it('should call repository function', async () => {
      const repository = {
        getAllPlain: jest.fn(),
      } as unknown as AuthorRepository;
      const useCases = new AuthorUseCases(repository);
      const fixtures = [authorFixture(), authorFixture(), authorFixture()].map(
        adaptAuthorEntityToPlainAuthorModel,
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
      } as unknown as AuthorRepository;
      const useCases = new AuthorUseCases(repository);
      const fixture = adaptAuthorEntityToPlainAuthorModel(authorFixture());

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
