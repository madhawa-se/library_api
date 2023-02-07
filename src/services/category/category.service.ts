import { Body, Delete, Get, Injectable, Param, Post, Put, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuardService } from 'src/auth/jwt-auth-guard/jwt-auth-guard.service';
import { AutherService } from 'src/auther/auther.service';
import { Auther } from 'src/models/Auther.entity';
import { Genre } from 'src/models/Genre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

constructor(@InjectRepository(Genre)
private categoryRepository: Repository<Genre>) {

}

async findAll(): Promise<Genre[]> {
    return this.categoryRepository.find();
}

async create(category: Genre) {
    this.categoryRepository.save(category);
}

async update(id: number, category: Genre) {
    this.categoryRepository.update(id, category);
}

async delete(id: number) {
    this.categoryRepository.delete(id);
}

}