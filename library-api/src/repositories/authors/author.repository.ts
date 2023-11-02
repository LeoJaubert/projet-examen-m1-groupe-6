import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Author, AuthorId } from 'library-api/src/entities';
import { NotFoundError } from 'library-api/src/common/errors';
import { PlainAuthorRepositoryOutput } from './author.repository.type';
import { adaptAuthorEntityToPlainAuthorModel } from './author.utils';

@Injectable()
export class AuthorRepository extends Repository<Author> {
  constructor(public readonly dataSource: DataSource) {
    super(Author, dataSource.createEntityManager());
  }

  /**
   * Get all plain authors
   * @returns Array of plain authors
   */
  public async getAllPlain(): Promise<PlainAuthorRepositoryOutput[]> {
    const authors = await this.find({});

    return authors.map(adaptAuthorEntityToPlainAuthorModel);
  }

  /**
   * Get a author by its ID
   * @param id Author's ID
   * @returns Author if found
   * @throws 404: author with this ID was not found
   */

  public async getByID(id: AuthorId): Promise<PlainAuthorRepositoryOutput> {
    const author = await this.findOne({ where: { id } });

    if (!author) {
      throw new NotFoundError(`Author - '${id}'`);
    }
    return adaptAuthorEntityToPlainAuthorModel(author);
  }
}
