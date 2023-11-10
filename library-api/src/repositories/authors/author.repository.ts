import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Author, AuthorId } from 'library-api/src/entities';
import {
  InternalServerError,
  NotFoundError,
} from 'library-api/src/common/errors';
import {
  CreateAuthorRepositoryInput,
  PlainAuthorRepositoryOutput,
} from './author.repository.type';
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
    const authors = await this.find({
      relations: {
        books: true,
      },
    });

    return authors.map(adaptAuthorEntityToPlainAuthorModel);
  }

  /**
   * Get a author by its ID
   * @param id Author's ID
   * @returns Author if found
   * @throws 404: author with this ID was not found
   */

  public async getById(id: AuthorId): Promise<PlainAuthorRepositoryOutput> {
    const author = await this.findOne({ where: { id } });

    if (!author) {
      throw new NotFoundError(`Author - '${id}'`);
    }
    return adaptAuthorEntityToPlainAuthorModel(author);
  }
  /**
   * Create a new Author
   * @Param input Data to create the new author
   * @returns Created Author
   */

  public async createAuthor(
    input: CreateAuthorRepositoryInput,
  ): Promise<PlainAuthorRepositoryOutput> {
    const id = await this.dataSource.transaction(async (manager) => {
      const [newAuthor] = await manager.save<Author>([
        manager.create<Author>(Author, { ...input }),
      ]);
      if (!newAuthor) {
        throw new InternalServerError('An error occured creating new Author');
      }

      return newAuthor.id;
    });
    return this.getById(id);
  }

  /**
   * Delete an author from database
   * @param id Author's id
   */
  public async deletebyid(id: AuthorId): Promise<void> {
    await this.delete(id);
  }
}
