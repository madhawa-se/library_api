import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthUser } from 'src/auth-user/auth-user.decorator';
import { JwtAuthGuardService } from 'src/auth/jwt-auth-guard/jwt-auth-guard.service';
import { Book } from 'src/models/Book.entity';
import { Borrow } from 'src/models/Borrow.entity';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
    constructor(private bookService: BookService) {

    }

    @Get()
    findAll(): Promise<Book[]> {
        return this.bookService.findAll();
    }

    @UseGuards(JwtAuthGuardService)
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

    @Post('borrow')
    async borrow(@Query('userId') userId: number, @Body() books: Book[]) {
        try {
            return await this.bookService.borrow(userId, books);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.FORBIDDEN, { cause: new Error("Some Error") });
        }
    }

    @UseGuards(JwtAuthGuardService)
    @Get('borrow')
    async borrowed(@AuthUser() authUser,@Query('userId') userId: number): Promise<Borrow[]> {
        try {
            return await this.bookService.getBorrowedBooks(authUser.id);
        } catch (e) {
            console.error(e);
        }
    }

    @UseGuards(JwtAuthGuardService)
    @Get('user-borrow')
    async userBorrowed(@AuthUser() authUser,@Query('userId') userId: number): Promise<Borrow[]> {
        try {
            return await this.bookService.getBorrowedBooks(userId);
        } catch (e) {
            console.error(e);
            // throw new HttpException(e, HttpStatus.FORBIDDEN);
        }
    }


    @UseGuards(JwtAuthGuardService)
    @Post('return')
    async returnBook(@AuthUser() authUser,@Query('borrowId') borrowId: number,@Query('userId') memberId: number) {
        try {
            return await this.bookService.returnBook(memberId,borrowId);
        } catch (e) {
            console.error(e);
            // throw new HttpException(e, HttpStatus.FORBIDDEN);
        }
    }

    @UseGuards(JwtAuthGuardService)
    @Get('fine')
    async fine(@AuthUser() authUser): Promise<number> {
        return this.bookService.calcFine(authUser.id);
    }
}
