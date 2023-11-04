import { UserId, Book } from 'library-api/src/entities';

export type PlainUserModel = {
  id: UserId;

  firstname: string;
  lastname: string;
};

export type UserModel = {
  id: UserId;

  firstname: string;
  lastname: string;
  book?: Book;
};
