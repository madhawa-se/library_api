import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Book } from 'src/models/Book.entity';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
    constructor(private bookService: BookService) {

    }

    @Get()
    findAll(): Promise<Book[]> {
        return this.bookService.findAll();
    }

    @Get('search')
    async search(@Query('name') name?: string): Promise<Book[]> {
      return this.bookService.search(name);
    }

    @Post()
    async create(@Body() book: Book) {
        this.bookService.create(book);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() book: Book) {
        this.bookService.update(id, book);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        this.bookService.delete(id);
    }
}
