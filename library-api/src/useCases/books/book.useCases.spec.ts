import { bookFixture } from 'library-api/src/fixtures';
import { BookRepository } from 'library-api/src/repositories';
import {
  adaptBookEntityToBookModel,
  adaptBookEntityToPlainBookModel,
} from 'library-api/src/repositories/books/book.utils';
import { InternalServerError } from 'library-api/src/common/errors';
import { BookUseCases } from './book.useCases';

describe('BookUseCases', () => {
  describe('getAllPlain', () => {
    it('should call repository function', async () => {
      const repository = { getAll: jest.fn() } as unknown as BookRepository;
      const useCases = new BookUseCases(repository);
      const fixtures = [bookFixture(), bookFixture(), bookFixture()].map(
        adaptBookEntityToPlainBookModel,
      );

      const getAllPlainSpy = jest
        .spyOn(repository, 'getAllPlain')
        .mockResolvedValue(fixtures);

      const result = await useCases.getAllPlain();

      expect(getAllPlainSpy).toHaveBeenCalledTimes(1);
      expect(getAllPlainSpy).toHaveBeenCalledWith();

      expect(result).toStrictEqual(fixtures);
    });
  });

  describe('getById', () => {
    it('should call repository function', async () => {
      const repository = {
        getById: jest.fn(),
      } as unknown as BookRepository;
      const useCases = new BookUseCases(repository);
      const fixture = adaptBookEntityToBookModel(bookFixture());

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
    it('should call repository function and return the created book', async () => {
      const repository = {
        createBook: jest.fn(),
      } as unknown as BookRepository;

      const useCases = new BookUseCases(repository);
      const input = {
        name: 'The Test Book',
        authorId: 'authorId',
        writtenOn: '2015',
        genre: 'Fantasy',
      };

      const createdBookEntity = { ...input, id: 'generated_book_id' };
      const createdBookModel = adaptBookEntityToBookModel(createdBookEntity);

      const createBookSpy = jest
        .spyOn(repository, 'createBook')
        .mockResolvedValue(createdBookEntity);

      const result = await useCases.create(input);

      expect(createBookSpy).toHaveBeenCalledTimes(1);
      expect(createBookSpy).toHaveBeenCalledWith(input);

      expect(result).toStrictEqual(createdBookModel);
    });

    it('should handle repository error during book creation', async () => {
      const repository = {
        create: jest.fn().mockImplementationOnce(() => {
          throw new Error('Repository error');
        }),
      } as unknown as BookRepository;

      const useCases = new BookUseCases(repository);
      const input = {
        title: 'The Test Book',
        authorId: 'authorId',
        writtenOn: '2015',
        genre: 'Fantasy',
      };

      try {
        await useCases.create(input);

        expect(true).toBeFalsy();
      } catch (err) {
        expect(err).toBeInstanceOf(InternalServerError);
        expect(err.message).toBe('An error occurred creating a new Book');
      }
    });
  });
});
