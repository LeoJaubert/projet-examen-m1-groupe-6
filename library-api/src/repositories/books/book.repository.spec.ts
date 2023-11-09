import { NotFoundError } from 'library-api/src/common/errors';
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
});
