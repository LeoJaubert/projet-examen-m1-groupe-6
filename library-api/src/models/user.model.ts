import { UserId } from 'library-api/src/entities';
import { BookModel } from 'library-api/src/models/book.model';

export type PlainUserModel = {
  id: UserId;
  firstname: string;
  lastname: string;
  books: string[];
};

export type UserModel = {
  id: UserId;

  firstname: string;
  lastname: string;
  books: BookModel[];
};
