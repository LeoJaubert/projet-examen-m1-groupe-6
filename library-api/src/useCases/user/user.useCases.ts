import { Injectable } from '@nestjs/common';
import { UserId } from 'library-api/src/entities';
import { UserRepository } from 'library-api/src/repositories';
import {
  UserUseCasesOutput,
  PlainUserUseCasesOutput,
  CreateUserUseCasesInput,
} from 'library-api/src/useCases/user/user.useCases.type';

@Injectable()
export class UserUseCases {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Get all plain users
   * @returns Array of plain users
   */
  public async getAllPlain(): Promise<PlainUserUseCasesOutput[]> {
    return this.userRepository.getAllPlain();
  }

  /**
   * Get a user by its ID
   * @param id User's ID
   * @returns User if found
   * @throws 404: user with this ID was not found
   */
  public async getById(id: UserId): Promise<UserUseCasesOutput> {
    return this.userRepository.getById(id);
  }

  /**
   * Create a new User
   * @Param input Data to create the new user
   * @returns Created User
   */
  public async create(
    input: CreateUserUseCasesInput,
  ): Promise<PlainUserUseCasesOutput> {
    return this.userRepository.createUser(input);
  }

  /**
   * Delete an user from Database
   * @param id User's ID
   * @throws NotFoundException : no user found
   */
  public async deletebyid(id: UserId): Promise<void> {
    const user = await this.getById(id);
    await this.userRepository.deletebyid(user.id);
  }
}
