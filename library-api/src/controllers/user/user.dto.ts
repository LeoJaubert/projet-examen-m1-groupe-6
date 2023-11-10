import { IsString } from '@nestjs/class-validator';

export class CreateUserDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  books: string[];
}
