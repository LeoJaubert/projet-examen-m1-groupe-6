import { IsString } from '@nestjs/class-validator';
import { Book } from 'library-api/src/entities';

export class CreateAuthorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  books: Book[];
}
