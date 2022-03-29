import { Body, Controller, Delete, forwardRef, Get, HttpException, HttpStatus, Inject, Param, Patch, Post } from '@nestjs/common';
import { ScoresService } from 'src/scores/scores.service';
import { CreateSubjectDto, UpdateSubjectDto } from './dto/index';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
export class SubjectsController {
    constructor(
        private readonly subjectsService: SubjectsService,

        @Inject(forwardRef(() => ScoresService))
        private readonly scoresService: ScoresService
    ) { }

    @Get()
    async index() {
        return await this.subjectsService.findAll();
    }

    @Get(':id')
    async find(@Param('id') id: string) {
        return await this.subjectsService.findOne(id);
    }

    @Post()
    async create(@Body() create: CreateSubjectDto) {
        return await this.subjectsService.create(create);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() update: UpdateSubjectDto) {
        return await this.subjectsService.update(id, update);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const subject = await this.subjectsService.findOne(id);
        if (subject.scores.length) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Subject has scores!`,
            }, HttpStatus.BAD_REQUEST);
        }
        return await this.subjectsService.remove(id);
    }
}
