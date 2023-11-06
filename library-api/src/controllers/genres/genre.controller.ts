import { Controller, Get } from '@nestjs/common';
import { GenreId } from 'library-api/src/entities';
import { GenreUseCases } from 'library-api/src/useCases';
import {
    GenrePresenter
  } from 'library-api/src/controllers/genres/genre.presenter';

@Controller('genres')
export class GenreController 
{
    constructor(private readonly GenreUseCases: GenreUseCases) {}

    @Get('/')
    public async getAll(): Promise<GenrePresenter[]> 
    {
      const authors = await this.GenreUseCases.getAllPlain();
  
      return authors.map(GenrePresenter.from);
    }
}
