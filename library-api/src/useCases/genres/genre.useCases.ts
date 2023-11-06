import { Injectable } from '@nestjs/common';
import { GenreRepository } from 'library-api/src/repositories';
import { GenreModelOutput } from 'library-api/src/useCases/genres/genre.useCases.type';

@Injectable()
export class GenreUseCases 
{
    constructor(private readonly genreRepository: GenreRepository) {}

    public async getAllPlain(): Promise<GenreModelOutput[]> {
        return this.genreRepository.getAllPlain();
      }
}
