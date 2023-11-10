import { Book, UserId } from 'library-api/src/entities';
import { UserModel, PlainUserModel } from 'library-api/src/models';

export class PlainUserPresenter {
  id: UserId;

  firstname: string;

  lastname: string;

  books: string[];

  private constructor(data: PlainUserPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainUserModel): PlainUserPresenter {
    return new PlainUserPresenter({
      id: data.id,
      firstname: data.firstname,
      lastname: data.lastname,
      books: data.books,
    });
  }
}

export class UserPresenter {
  id: string;

  firstname: string;

  lastname: string;

  books: string[];

  private constructor(data: UserPresenter) {
    Object.assign(this, data);
  }

  public static from(data: UserModel): UserPresenter {
    return new UserPresenter({
      id: data.id,
      firstname: data.firstname,
      lastname: data.lastname,
      books: data.books.map((book) => book.name),
    });
  }
}
