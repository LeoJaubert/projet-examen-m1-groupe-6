import { Injectable } from '@nestjs/common';
import { AuthorId } from 'library-api/src/entities';
import { AuthorRepository } from 'library-api/src/repositories';
import { PlainAuthorUseCasesOutput } from 'library-api/src/useCases/authors/author.useCases.type';

@Injectable()
export class AuthorUseCases {
  constructor(private readonly authorRepository: AuthorRepository) {}

  /**
   * Get all plain authors
   * @returns Array of plain authors
   */
  public async getAllPlain(): Promise<PlainAuthorUseCasesOutput[]> {
    return this.authorRepository.getAllPlain();
  }

  /**
   * Get an author by its ID
   * @param id Author's ID
   * @returns Author if found
   * @throws 404: author with this ID was not found
   */
  public async getByID(id: AuthorId): Promise<PlainAuthorUseCasesOutput> {
    return this.authorRepository.getByID(id);
  }
}
