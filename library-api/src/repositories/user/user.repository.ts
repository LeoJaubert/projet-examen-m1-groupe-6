import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'library-api/src/common/errors';
import { User, UserId } from 'library-api/src/entities';
import {
  UserRepositoryOutput,
  PlainUserRepositoryOutput,
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
    const users = await this.find({});

    return users.map(adaptUserEntityToPlainUserModel);
  }

  /**
   * Get a user by its ID
   * @param id user's ID
   * @returns user if found
   * @throws 404: user with this ID was not found
   */
  public async getById(id: UserId): Promise<UserRepositoryOutput> {
    const user = await this.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundError(`User - '${id}'`);
    }

    return adaptUserEntityToUserModel(user);
  }
}
