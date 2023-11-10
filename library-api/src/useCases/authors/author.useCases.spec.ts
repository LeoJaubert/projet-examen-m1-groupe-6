import { InternalServerError } from 'library-api/src/common/errors';
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
  describe('create', () => {
    it('should call repository function and return the created author', async () => {
      const repository = {
        create: jest.fn(),
      } as unknown as AuthorRepository;

      const useCases = new AuthorUseCases(repository);
      const input = {
        firstName: 'testfirstname',
        lastName: 'testlastname',
        photoUrl:'testphotoUrl',
      };

      const createdAuthorEntity = { ...input, id: 'id' };
      const createdAuthorModel = adaptAuthorEntityToPlainAuthorModel(createdAuthorEntity);

      const createAuthorSpy = jest
        .spyOn(repository, 'createAuthor')
        .mockResolvedValue(createdAuthorEntity);

      const result = await useCases.create(input);

      expect(createAuthorSpy).toHaveBeenCalledTimes(1);
      expect(createAuthorSpy).toHaveBeenCalledWith(input);

      expect(result).toStrictEqual(createdAuthorModel);
    });

    it('should handle repository error during author creation', async () => {
      const repository = {
        create: jest.fn().mockImplementationOnce(() => {
          throw new Error('Repository error');
        }),
      } as unknown as AuthorRepository;

      const useCases = new AuthorUseCases(repository);
      const input = {
        firstName: 'testfirstname',
        lastName: 'testlastname',
        photoUrl: 'testphotoUrl',
      };

      try {
        await useCases.create(input);
        // If the repository error occurs, the test should not reach here
        expect(true).toBeFalsy();
      } catch (err) {
        expect(err).toBeInstanceOf(InternalServerError);
        expect(err.message).toBe('An error occurred creating a new Author');
      }
    });
  });
});
