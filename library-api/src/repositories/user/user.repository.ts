import { Injectable } from '@nestjs/common';
import {
  NotFoundError,
  InternalServerError,
} from 'library-api/src/common/errors';
import { User, UserId } from 'library-api/src/entities';
import {
  UserRepositoryOutput,
  PlainUserRepositoryOutput,
  CreateUserRepositoryInput,
} from 'library-api/src/repositories/user/user.repository.type';
import {
  adaptUserEntityToUserModel,
  adaptUserEntityToPlainUserModel,
} from 'library-api/src/repositories/user/user.utils';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(public readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  /**
   * Get all plain users
   * @returns Array of plain users
   */
  public async getAllPlain(): Promise<PlainUserRepositoryOutput[]> {
    const users = await this.find({
      relations: {
        userBooks: { book: true },
      },
    });

    return users.map(adaptUserEntityToPlainUserModel);
  }

  /**
   * Get a user by its ID
   * @param id user's ID
   * @returns user if found
   * @throws 404: user with this ID was not found
   */
  public async getById(id: UserId): Promise<UserRepositoryOutput> {
    const user = await this.findOne({
      relations: {
        userBooks: { book: true },
      },
      where: { id },
    });

    if (!user) {
      throw new NotFoundError(`User - '${id}'`);
    }

    return adaptUserEntityToUserModel(user);
  }

  /**
   * Create a new User
   * @Param input Data to create the new user
   * @returns Created User
   */

  public async createUser(
    input: CreateUserRepositoryInput,
  ): Promise<UserRepositoryOutput> {
    const id = await this.dataSource.transaction(async (manager) => {
      const [newUser] = await manager.save<User>([
        manager.create<User>(User, { ...input, userBooks: undefined }),
      ]);
      if (!newUser) {
        throw new InternalServerError('An error occured creating new User');
      }

      return newUser.id;
    });
    return this.getById(id);
  }

  /**
   * Delete an user from database
   * @param id User's id
   */
  public async deletebyid(id: UserId): Promise<void> {
    await this.delete(id);
  }
}
