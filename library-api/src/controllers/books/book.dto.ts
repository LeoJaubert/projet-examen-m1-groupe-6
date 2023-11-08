import { IsDate, IsString } from '@nestjs/class-validator';
import { Author, Genre } from 'library-api/src/entities';

export class CreateBookDto {
  @IsString()
  name: string;

  @IsDate()
  writtenOn: Date;

  author: Author;

  genres: Genre[];
}
