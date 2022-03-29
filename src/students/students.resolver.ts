import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ClassesService } from 'src/classes/classes.service';
import { Class } from 'src/classes/entities/class.schema';
import { Score, ScoreResult } from 'src/scores/entities/score.schema';
import { ScoresService } from 'src/scores/scores.service';
import { Student } from './entities/student.schema';
import { StudentsService } from './students.service';
import { CreateStudentInput, UpdateStudentInput, removeStudentInput } from './input/index'
import { HttpException, HttpStatus } from '@nestjs/common';
import DataLoader from 'dataloader';
import { ObjectId } from 'mongoose';
import { read } from 'fs';

@Resolver(of => Student)
export class StudentsResolver {
    constructor(
        private readonly studentsService: StudentsService,
        private readonly classesService: ClassesService,
        private readonly scoresService: ScoresService
    ) { }


    @Query(() => Student,{name : 'FindStudent'})
    findOneStudent(@Args('id') id: string) {
        return this.studentsService.findOne(id);
    }

    @Query(() => Student,{name : 'FindStudents'})
    find() {
        return this.studentsService.findAll();
    }

    @Mutation(() => Student, {name : "CreateStudent"})
    async addStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput) {
        const _class = await this.classesService.findOne(createStudentInput.class);
        if (!_class) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST, error: `Bad Request: Class cannot found!`,
            }, HttpStatus.BAD_REQUEST);
        }
        const result = await this.studentsService.create(createStudentInput);
        this.classesService.updatePushOneStudent(_class._id, result);
        return result;
    }

    @Mutation(() => Student, {name : "UpdateStudent"})
    async updateStudent(@Args('updateStudentInput') updateStudentInput: UpdateStudentInput) {
        const { _id, ...update } = updateStudentInput;
        const _class = await this.classesService.findOne(update.class);
        if (!_class) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST, error: `Bad Request: Class cannot found!`,
            }, HttpStatus.BAD_REQUEST);
        }
        return this.studentsService.update(_id, update);
    }

    @Mutation(() => Student, {name :"DeleteStudent"})
    async removeStudent(@Args('removeStudentInput') removeStudentInput: removeStudentInput) {
        const score = this.scoresService.checkExist({ student: removeStudentInput._id });
        if (score) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST, error: `Bad Request: Student has scores!`,
            }, HttpStatus.BAD_REQUEST);
        }
        return this.studentsService.remove(removeStudentInput._id);
    }

    //Lay class object va scores object trong student
    @ResolveField('class', returns => Class)
    async getClass(
        @Parent() parent: Student,
        @Context() { classesLoaderById }: { classesLoaderById: DataLoader<ObjectId, Class> }
    ) {
        return classesLoaderById.load(parent.class._id);
    }

    @ResolveField('scores', returns => [Score])
    async getScores(
        @Parent() parent: Student,
        @Context() { scoresLoaderByStudent }: { scoresLoaderByStudent: DataLoader<ObjectId, ScoreResult> }
    ) {
        return (await scoresLoaderByStudent.load(parent._id)).result;
    }
}
