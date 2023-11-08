import { Controller, Get } from '@nestjs/common';
import { GenreUseCases } from 'library-api/src/useCases';
import { GenrePresenter } from 'library-api/src/controllers/genres/genre.presenter';

@Controller('genres')
export class GenreController {
  constructor(private readonly GenreUseCase: GenreUseCases) {}

  @Get('/')
  public async getAll(): Promise<GenrePresenter[]> {
    const authors = await this.GenreUseCase.getAllPlain();

    return authors.map(GenrePresenter.from);
  }
}
