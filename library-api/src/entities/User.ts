import{
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from './Book';

export type UserId = string & { __brand: 'User' };

@Entity('Users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: UserId;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @OneToMany(() => Book,(book)=>Book, {onDelete: 'CASCADE'})
    book?: Book;
}