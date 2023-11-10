/* eslint-disable import/no-cycle */
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Book } from './Book';
import { User } from './User';

export type UserBookId = string & { __brand: 'UserBook' };

@Entity('UserBooks')
export class UserBook extends BaseEntity {
  @PrimaryColumn()
  id: UserBookId;

  @ManyToOne(() => Book, (book) => book.userBooks, {
    onDelete: 'CASCADE',
  })
  book: Book;

  @ManyToOne(() => User, (user) => user.userBooks, {
    onDelete: 'CASCADE',
  })
  user: User;
}
