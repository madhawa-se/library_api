import { Body, Delete, Injectable, Param, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/models/Book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {

    constructor(@InjectRepository(Book)
    private bookRepository: Repository<Book>) {

    }

    async findAll(): Promise<Book[]> {
        return this.bookRepository.find();
    }

    async search(name: string): Promise<Book[]> {
        if (name) {
            return await this.bookRepository
                .createQueryBuilder('book')
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
}
