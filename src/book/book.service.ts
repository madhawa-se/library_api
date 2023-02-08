import { Body, Delete, Injectable, Param, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/models/Book.entity';
import { Borrow } from 'src/models/Borrow.entity';
import { getConnection, getRepository, Repository } from 'typeorm';

@Injectable()
export class BookService {


    constructor(@InjectRepository(Book)
    private bookRepository: Repository<Book>, @InjectRepository(Borrow)
        private borrowRepository: Repository<Borrow>) {

    }

    async findAll(): Promise<Book[]> {
        return await this.bookRepository
            .createQueryBuilder('book')
            .leftJoinAndSelect('book.auther', 'auther')
            .leftJoinAndSelect('book.genre', 'genre')
            .getMany();
    }

    async search(name: string): Promise<Book[]> {
        if (name) {
            return await this.bookRepository
                .createQueryBuilder('book')
                .leftJoinAndSelect('book.auther', 'auther')
                .leftJoinAndSelect('book.genre', 'genre')
                .where('book.name = :name OR book.name LIKE :like', {
                    name: name,
                    like: `%${name}%`,
                })
                .getMany();

        }
        return [];
    }

    async create(book: Book) {
        this.bookRepository.save(book);
    }

    async update(id: number, book: Book) {
        this.bookRepository.update(id, book);
    }

    async delete(id: number) {
        this.bookRepository.delete(id);
    }

    async borrow(memberId: number, books: Book[]) {
        const borrowedBooks = await this.getBorrowedBooks(memberId);
        if (borrowedBooks.length + books.length > 3) {
            throw new Error('You can borrow only 3 books at a time');
        }
        for (const book of books) {
            const newBorrow = new Borrow();
            newBorrow.memberId = memberId;
            newBorrow.bookId = book.id;
            newBorrow.date = new Date();
            newBorrow.status = 'borrowed';
            await this.borrowRepository.save(newBorrow);
        }
    }

    async getBorrowedBooks(memberId: number): Promise<Borrow[]> {
        const borrowedBooks = await this.borrowRepository
            .createQueryBuilder('borrow')
            // .addSelect("borrow.date", "dueDate")
            .leftJoinAndSelect('borrow.book', 'book')
            .leftJoinAndSelect('book.auther', 'auther')
            .leftJoinAndSelect('book.genre', 'genre')
            .where('borrow.memberId = :memberId', {
                memberId: memberId
            })
            .andWhere("status = :status", { status: 'borrowed' })
            .getMany();
        return borrowedBooks;
    }

    async returnBook(memberId: number, borrowId: number) {
        await this.borrowRepository.
            createQueryBuilder('borrow')
            .update()
            .set({ status: 'returned' })
            .where("memberId = :memberId", { memberId: memberId })
            .andWhere("borrowId = :borrowId", { borrowId: borrowId })
            .andWhere("status = :status", { status: 'borrowed' })
            .execute();
    }

    calcFine(id: any) {

        return 100;

        // this.dueDate = new Date(new Date(this.date).getTime() + 1000 * 60 * 60 * 24 * 14);
        // //calculate fine 

        // const due = new Date(this.dueDate);
        // const today = new Date();
        // const differenceInMilliseconds = today.getTime() - due.getTime();
        // const differenceInDays = Math.round(differenceInMilliseconds / 1000 / 60 / 60 / 24);
        // this.cost = differenceInDays > 0 ? differenceInDays * this.costPerDay : 0;

    }


}
