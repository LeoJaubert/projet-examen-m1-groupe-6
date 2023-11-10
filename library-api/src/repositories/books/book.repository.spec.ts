import {
  NotFoundError,
  InternalServerError,
} from 'library-api/src/common/errors';
import { bookFixture } from 'library-api/src/fixtures';
import { DataSource } from 'typeorm';
import { BookRepository } from './book.repository';
import { adaptBookEntityToPlainBookModel } from './book.utils';

describe('BookRepository', () => {
  describe('getAllPlain', () => {
    it('should return all books', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new BookRepository(dataSource);

      const book = [bookFixture(), bookFixture(), bookFixture()];

      const findSpy = jest.spyOn(repository, 'find').mockResolvedValue(book);

      const result = await repository.getAllPlain();

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({
        relations: { bookGenres: { genre: true }, author: true },
      });

      expect(result).toStrictEqual(book.map(adaptBookEntityToPlainBookModel));
      expect(true).toBeTruthy();
      expect(null).toBeNull();
    });
  });

  describe('getById', () => {
    it('should return found book', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new BookRepository(dataSource);

      const fixture = bookFixture();

      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(fixture);

      try {
        const result = await repository.getById(fixture.id);

        expect(findOneSpy).toHaveBeenCalledTimes(1);
        expect(findOneSpy).toHaveBeenCalledWith({
          where: { id: fixture.id },
          relations: { bookGenres: { genre: true }, author: true },
        });

        expect(result).toStrictEqual(adaptBookEntityToPlainBookModel(fixture));
      } catch {
        expect(true).toBeFalsy();
      }
    });

    it('should not find book', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new BookRepository(dataSource);

      const fixture = bookFixture();

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
          relations: { bookGenres: { genre: true }, author: true },
        });

        expect(err).toStrictEqual(new NotFoundError(`Book: '${fixture.id}'`));
      }
    });
  });

  describe('createBook', () => {
    it('should create a new book', async () => {
      const dataSource = {
        transaction: jest.fn(),
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new BookRepository(dataSource);

      const input = {
        name: 'The Test Book',
        authorId: 'Author.id',
        writtenOn: 2015,
        genre: 'Fantasy',
      };

      const saveSpy = jest
        .spyOn(repository.manager, 'save')
        .mockResolvedValue([{ ...input, id: 'generated_book_id' }]);

      const result = await repository.createBook(input);

      expect(dataSource.transaction).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith([
        repository.manager.create(Book, { ...input }),
      ]);
      expect(result).toStrictEqual(
        adaptBookEntityToPlainBookModel({
          ...input,
          id: 'generated_book_id',
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
      const repository = new BookRepository(dataSource);

      const input = {
        name: 'The Test Book',
        authorId: 'Author.id',
        writtenOn: 2015,
        genre: 'Fantasy',
      };

      try {
        await repository.createBook(input);

        expect(true).toBeFalsy();
      } catch (err) {
        expect(dataSource.transaction).toHaveBeenCalledTimes(1);
        expect(err).toBeInstanceOf(InternalServerError);
        expect(err.message).toBe('An error occurred creating a new Book');
      }
    });
  });
});
