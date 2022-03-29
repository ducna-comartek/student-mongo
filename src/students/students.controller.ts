import { Body, Controller, Delete, forwardRef, Get, HttpException, HttpStatus, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { query } from 'express';
import { ClassesService } from 'src/classes/classes.service';
import { ScoresService } from 'src/scores/scores.service';
import { CreateStudentDto, UpdateStudentDto, FilterOutcomeDto } from './dto/index';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
    constructor(
        private readonly studentsService: StudentsService,
        private readonly classService: ClassesService,
        private readonly scoresService: ScoresService
    ) { }

    @Get()
    async index() {
        return await this.studentsService.findAll();
    }

    @Get(':id')
    async find(@Param('id') id: string) {
        return await this.studentsService.findOne(id);
    }

    @Post()
    async create(@Body() create: CreateStudentDto) {
        const _class = await this.classService.findOne(create.class);
        if (!_class) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Class cannot found!`,
            }, HttpStatus.BAD_REQUEST);
        }
        return await this.studentsService.create(create);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() update: UpdateStudentDto) {
        if (update.class) {
            const _class = await this.classService.findOne(update.class);
            if (!_class) {
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: `Bad Request: Class cannot found!`,
                }, HttpStatus.BAD_REQUEST);
            }
        }
        return await this.studentsService.update(id, update);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const student = await this.studentsService.findOne(id);
        if (student.scores.length) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Student has scores!`,
            }, HttpStatus.BAD_REQUEST);
        }
        return await this.studentsService.remove(id);;
    }
}
