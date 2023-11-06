import { Author, Genre } from 'library-api/src/entities';

export class CreateBookDto {
  name: string;

  writtenOn: Date;

  author: Author;

  genres: Genre[];
}

export function isString(data: any): boolean {
  return typeof data === 'string';
}

export function validBook(input: CreateBookDto): void {
  if (!isString(input.name)) {
    throw new Error('Book not valid');
  }
}
