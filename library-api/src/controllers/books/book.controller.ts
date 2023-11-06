import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import {
  BookPresenter,
  PlainBookPresenter,
} from 'library-api/src/controllers/books/book.presenter';
import { BookId } from 'library-api/src/entities';
import { BookUseCases } from 'library-api/src/useCases';
import { CreateBookDto, validBook } from './book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookUseCases: BookUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainBookPresenter[]> {
    const books = await this.bookUseCases.getAllPlain();

    return books.map(PlainBookPresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: BookId): Promise<BookPresenter> {
    const book = await this.bookUseCases.getById(id);

    return BookPresenter.from(book);
  }

  @Post()
  public async create(@Body() input: CreateBookDto): Promise<BookPresenter> {
    validBook(input);
    const book = await this.bookUseCases.create(input);

    return BookPresenter.from(book);
  }

  @Delete('/:id')
  public async deleteById(@Param('id') id: BookId): Promise<void> {
    await this.bookUseCases.deletebyid(id);
  }
}
