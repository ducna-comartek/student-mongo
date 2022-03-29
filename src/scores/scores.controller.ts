import { Body, Controller, Delete, forwardRef, Get, HttpException, HttpStatus, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClassesService } from 'src/classes/classes.service';
import { StudentsService } from 'src/students/students.service';
import { SubjectsService } from 'src/subjects/subjects.service';
import { CreateScoreDto, UpdateScoreDto } from './dto/index';
import { ScoresService } from './scores.service';

@Controller('scores')
export class ScoresController {
    constructor(
        private readonly scoresService: ScoresService,
        @Inject(forwardRef(() => StudentsService))
        private readonly studentsService: StudentsService,
        @Inject(forwardRef(() => SubjectsService))
        private readonly subjectsService: SubjectsService,
        // @Inject(forwardRef(() => ClassesService))
        // private readonly classesService: ClassesService,
    ) { }

    @Get()
    async index() {
        return await this.scoresService.findAll();
    }

    @Get(':id')
    async find(@Param('id') id: string) {
        return await this.scoresService.findOne(id);
    }

    @Post()
    async create(@Body() create: CreateScoreDto) {
        //Kiểm tra xem học sinh và môn học có tồn tại không
        const student = await this.studentsService.findOne(create.student);
        const subject = await this.subjectsService.findOne(create.subject);
        if (!subject || !student) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Student or Subject cannot found!`,
            }, HttpStatus.BAD_REQUEST);
        }

        // Nếu điểm đã tồn tại thì không thể thêm vào
        const hasScore = Boolean(await this.scoresService.findOneByStudentAndSubject(student, subject));
        if (hasScore) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Score already exists!`,
            }, HttpStatus.BAD_REQUEST);
        }

        // Thêm vào score và cập nhập ở student, subject
        return await this.scoresService.create(create);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() update: UpdateScoreDto) {
        return await this.scoresService.update(id, update);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.scoresService.remove(id);
    }
}
