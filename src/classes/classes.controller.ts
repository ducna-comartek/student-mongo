import { Body, Controller, Delete, forwardRef, Get, Inject, Param, Post, Patch, Query, HttpException, HttpStatus } from '@nestjs/common';
import { StudentsService } from 'src/students/students.service';
import { ClassesService } from './classes.service';
import { CreateClassDto, UpdateClassDto } from './dto/index';
import { ObjectId } from 'mongoose';

@Controller('classes')
export class ClassesController {
    constructor(
        private readonly classesService: ClassesService,

        @Inject(forwardRef(() => StudentsService))
        private readonly studentService: StudentsService
    ) { }

    @Get()
    async index() {
        return await this.classesService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string | ObjectId) {
        return await this.classesService.findOne(id);
    }

    @Post()
    async create(@Body() create: CreateClassDto) {
        return await this.classesService.create(create);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() update: UpdateClassDto) {
        return await this.classesService.update(id, update);
    }

    @Delete(':id')
    async remove(@Param('id') id: string | ObjectId) {
        const _class = await this.classesService.findOne(id);
        if (_class.students.length) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Class has students!`,
            }, HttpStatus.BAD_REQUEST);
        }
        return await this.classesService.remove(id);
    }
}
