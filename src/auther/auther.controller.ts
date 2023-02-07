import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuardService } from 'src/auth/jwt-auth-guard/jwt-auth-guard.service';
import { Auther } from 'src/models/Auther.entity';
import { Book } from 'src/models/Book.entity';
import { AutherService } from './auther.service';

@Controller('auther')
export class AutherController {
    constructor(private autherService: AutherService) {

    }


    @UseGuards(JwtAuthGuardService)
    @Get()
    findAll(): Promise<Auther[]> {
        return this.autherService.findAll();
    }


    @Post()
    async create(@Body() auther: Auther) {
        this.autherService.create(auther);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() auther: Auther) {
        this.autherService.update(id, auther);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        this.autherService.delete(id);
    }
}
