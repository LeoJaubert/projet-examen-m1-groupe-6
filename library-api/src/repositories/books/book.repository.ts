import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'library-api/src/common/errors';
import {
  Book,
  BookGenre,
  BookId,
  Genre,
  Author,
} from 'library-api/src/entities';
import { GenreModel, PlainAuthorModel } from 'library-api/src/models';
import {
  BookRepositoryOutput,
  PlainBookRepositoryOutput,
  CreateBookRepositoryInput,
} from 'library-api/src/repositories/books/book.repository.type';
import {
  adaptBookEntityToBookModel,
  adaptBookEntityToPlainBookModel,
} from 'library-api/src/repositories/books/book.utils';
import { DataSource, Repository, In } from 'typeorm';
import { v4 } from 'uuid';

@Injectable()
export class BookRepository extends Repository<Book> {
  constructor(public readonly dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<PlainBookRepositoryOutput[]> {
    const books = await this.find({
      relations: { bookGenres: { genre: true }, author: true },
    });

    return books.map(adaptBookEntityToPlainBookModel);
  }

  /**
   * Get a book by its ID
   * @param id Book's ID
   * @returns Book if found
   * @throws 404: book with this ID was not found
   */
  public async getById(id: BookId): Promise<BookRepositoryOutput> {
    const book = await this.findOne({
      where: { id },
      relations: { bookGenres: { genre: true }, author: true },
    });

    if (!book) {
      throw new NotFoundError(`Book - '${id}'`);
    }

    return adaptBookEntityToBookModel(book);
  }

  /**
   * Create a new Book
   * @param input Data to create the book
   * @returns Created author
   */
  public async createBook(
    input: CreateBookRepositoryInput,
  ): Promise<BookRepositoryOutput> {
    const id = await this.dataSource.transaction(async (manager) => {
      const [newBook] = await manager.save<Book>(
        manager.create<Book>(Book, [
          {
            ...input,
            id: v4(),
            bookGenres: undefined,
            author: undefined,
          },
        ]),
      );
      function getgenreid(genre: GenreModel): string {
        return genre.id;
      }
      if (input.genres) {
        await manager.delete<BookGenre>(BookGenre, {
          book: { id: newBook.id },
        });
        const newGenres = await manager.find<Genre>(Genre, {
          where: {
            id: In(input.genres.map((genres) => getgenreid(genres))),
          },
        });

        await manager.save<BookGenre>(
          newGenres.map((genre) =>
            manager.create<BookGenre>(BookGenre, {
              id: v4(),
              book: { id: newBook.id },
              genre,
            }),
          ),
        );
      }
      if (input.author) {
        // Assuming you have an Author table and you need to associate the book with an author
        const author = await manager.findOne<Author>(Author, {
          where: { lastName: input.author.lastName },
        });
  
        newBook.author = author;
        await manager.save<Book>(newBook);
      }
      return newBook.id;
    });
    return this.getById(id);
  }
}
