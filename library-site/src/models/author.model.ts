import { PlainBookModel } from './book.model';

export type PlainAuthorModel = {
  id: string;
  firstName: string;
  lastName: string;
  books: PlainBookModel[];
};
