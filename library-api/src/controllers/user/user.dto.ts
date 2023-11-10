import { IsString } from '@nestjs/class-validator';
import { Book } from 'library-api/src/entities';

export class CreateUserDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  books: string[];
}
