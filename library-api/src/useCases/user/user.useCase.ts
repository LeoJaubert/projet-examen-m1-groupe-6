import { Injectable } from '@nestjs/common';
import { UserId } from 'library-api/src/entities';
import { UserRepository } from 'library-api/src/repositories';
import {
  UserUseCasesOutput,
  PlainUserUseCasesOutput,
} from 'library-api/src/useCases/user/user.useCase.type';

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
}
