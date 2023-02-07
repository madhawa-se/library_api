import { Body, Delete, Get, Injectable, Param, Post, Put, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auther } from 'src/models/Auther.entity';
import { Book } from 'src/models/Book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AutherService {

    constructor(@InjectRepository(Auther)
    private autherRepository: Repository<Auther>) {

    }

    async findAll(): Promise<Auther[]> {
        return this.autherRepository.find();
    }

    async create(auther: Auther) {
        this.autherRepository.save(auther);
    }

    async update(id: number, auther: Auther) {
        this.autherRepository.update(id, auther);
    }

    async delete(id: number) {
        this.autherRepository.delete(id);
    }

}
