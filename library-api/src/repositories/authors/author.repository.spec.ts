import { NotFoundError } from 'rxjs';
import { authorFixture } from 'library-api/src/fixtures/author.fixture';
import { DataSource } from 'typeorm';
import { AuthorRepository } from './author.repository';
import { adaptAuthorEntityToPlainAuthorModel } from './author.utils';

describe('AuthorRepository', () => {
  describe('getAllPlain', () => {
    it('should return all authors', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new AuthorRepository(dataSource);

      const authors = [authorFixture(), authorFixture(), authorFixture()];

      const findSpy = jest.spyOn(repository, 'find').mockResolvedValue(authors);

      const result = await repository.getAllPlain();

      expect(findSpy).toHaveBeenCalledTimes(1);

      expect(result).toStrictEqual(
        authors.map(adaptAuthorEntityToPlainAuthorModel),
      );
      expect(true).toBeTruthy();
      expect(null).toBeNull();
    });
  });

  describe('getById', () => {
    it('should return found author', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new AuthorRepository(dataSource);

      const fixture = authorFixture();

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
          adaptAuthorEntityToPlainAuthorModel(fixture),
        );
      } catch {
        expect(true).toBeFalsy();
      }
    });

    it('should not find author', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new AuthorRepository(dataSource);

      const fixture = authorFixture();

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
});
