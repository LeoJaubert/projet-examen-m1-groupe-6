import { Genre } from 'library-api/src/entities';
import { GenreRepositoryOutput } from './genre.repository.type';

export const adaptGenreEntityToPlainGenreModel = (
  genre: Genre,
): GenreRepositoryOutput => ({
  ...genre,
});