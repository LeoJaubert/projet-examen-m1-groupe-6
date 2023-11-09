import { bookFixture } from 'library-api/src/fixtures';
import { BookRepository } from 'library-api/src/repositories';
import {
  adaptBookEntityToBookModel,
  adaptBookEntityToPlainBookModel,
} from 'library-api/src/repositories/books/book.utils';
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
});
