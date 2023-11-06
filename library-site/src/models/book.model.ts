import { PlainAuthorModel } from '.';

export * from './author.model';

export type PlainBookModel = 
{
  id: string;
  name: string;
  genres: string[];
  writtenOn: Date,
  author: PlainAuthorModel;
};
