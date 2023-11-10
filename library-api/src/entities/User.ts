import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserBook } from './UserBook';

export type UserId = string & { __brand: 'User' };

@Entity('Users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UserId;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @OneToMany(() => UserBook, (userBook) => userBook.user)
  userBooks: UserBook[];
}
