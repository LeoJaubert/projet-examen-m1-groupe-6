import { Injectable } from '@nestjs/common';
import { Genre } from 'library-api/src/entities';
import { DataSource, Repository } from 'typeorm';
import { GenreRepositoryOutput } from 'library-api/src/repositories/genres/genre.repository.type';
import { adaptGenreEntityToPlainGenreModel } from './genre.utils';

@Injectable()
export class GenreRepository extends Repository<Genre> {
  constructor(public readonly dataSource: DataSource) {
    super(Genre, dataSource.createEntityManager());
  }

  public async getAllPlain(): Promise<GenreRepositoryOutput[]> {
    const users = await this.find({});

    return users.map(adaptGenreEntityToPlainGenreModel);
  }
}
