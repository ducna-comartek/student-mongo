import { Resolver, Query, ResolveField, Args, ID, Parent, Mutation, Context } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { ClassesService } from './classes.service';
import { StudentsService } from 'src/students/students.service';
import { CreateClassInput, UpdateClassInput, removeClassInput } from './input/index';
import { HttpException, HttpStatus } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Class } from './entities/class.schema';
import { Student, StudentResult } from 'src/students/entities/student.schema';

@Resolver(() => Class)
export class ClassesResolver {
    constructor(
        private readonly classesService: ClassesService,
        private readonly studentsService: StudentsService
    ) { }

    @Query(() => [Class], {name : 'FindClasses'})
    async getClasses() {
        return this.classesService.findAll();
    }

    @Query(() => [Class], {name : 'FindClass'})
    async getClass(_id : string | ObjectId) {
        return this.classesService.findOne(_id);
    }

    @Mutation(() => Class, {name : "CreateClass"})
    async addClass(@Args('createClassInput') createClassInput: CreateClassInput) {
        return this.classesService.create(createClassInput);
    }

    @Mutation(() => Class, {name : "UpdateClass"})
    async updateClass(@Args('updateClassInput') updateClassInput: UpdateClassInput) {
        const { _id, ...update } = updateClassInput;
        return this.classesService.update(_id, update);
    }

    @Mutation(() => Class, {name : "DeleteClass"})
    async removeClass(@Args('removeClassInput') { _id }: removeClassInput) {
        //Kiểm tra class có student ko?
        const student = await this.studentsService.checkExist({ class: _id });
        if (student) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST, error: `Bad Request: Class has students!`,
            }, HttpStatus.BAD_REQUEST);
        }
        return this.classesService.remove(_id);
    }

    //Lay students trong Class
    @ResolveField('students', () => [Student])
    async getStudents(
        @Parent() parent: Class,
        @Context() {
            studentsLoaderByClass
        }: { studentsLoaderByClass: DataLoader<ObjectId, StudentResult> }
    ) {
        return (await studentsLoaderByClass.load(parent._id)).result;
    }
}
