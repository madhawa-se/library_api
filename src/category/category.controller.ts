import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuardService } from 'src/auth/jwt-auth-guard/jwt-auth-guard.service';
import { Auther } from 'src/models/Auther.entity';
import { Genre } from 'src/models/Genre.entity';
import { CategoryService } from 'src/services/category/category.service';

@Controller('category')
export class CategoryController {


    constructor(private categoryService:CategoryService){

    }

    @UseGuards(JwtAuthGuardService)
    @Get()
    findAll(): Promise<Genre[]> {
        return this.categoryService.findAll();
    }


    @Post()
    async create(@Body() category: Genre) {
        this.categoryService.create(category);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() category: Genre) {
        this.categoryService.update(id, category);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        this.categoryService.delete(id);
    }


}
