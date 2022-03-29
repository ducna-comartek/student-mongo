import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Score, ScoreResult } from 'src/scores/entities/score.schema';
import { ScoresService } from 'src/scores/scores.service';
import { Subject } from './entities/subject.schema';
import { SubjectsService } from './subjects.service';
import { CreateSubjectInput, UpdateSubjectInput, removeSubjectInput, FindSubjectInput } from './input/index';
import { HttpException, HttpStatus } from '@nestjs/common';
import DataLoader from 'dataloader';
import { ObjectId } from 'mongoose';

@Resolver(of => Subject)
export class SubjectsResolver {
    constructor(
        private readonly subjectsService: SubjectsService,
        private readonly scoresService: ScoresService
    ) { }

    @Query(() => [Subject], {name : "FindSubjects"})
    async getSubjects() {
        return this.subjectsService.findAll();
    }


    @Query(() => Subject , {name : "FindSubject"})
    async getSubject(@Args('findSubjectInput') { _id }: FindSubjectInput) {
        return this.subjectsService.findOne(_id);
    }

    @Mutation(() => Subject, {name : "CreateSubject"})
    async addSubject(@Args('createSubjectInput') createSubjectInput: CreateSubjectInput) {
        return this.subjectsService.create(createSubjectInput);
    }

    @Mutation(() => Subject, {name : "UpdateSubject"})
    async updateSubject(@Args('updateSubjectInput') updateSubjectInput: UpdateSubjectInput) {
        const { _id, ...update } = updateSubjectInput
        return this.subjectsService.update(_id, update);
    }

    @Mutation(() => Subject, {name : "DeleteSubject"})
    async removeSubject(@Args('removeSubjectInput') { _id }: removeSubjectInput) {
        const score = await this.scoresService.checkExist({ subject: _id });
        if (score) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST, error: `Bad Request: Subject has scores!`,
            }, HttpStatus.BAD_REQUEST);
        }
        return this.subjectsService.remove(_id);
    }

    //lay scores object trong subject
    @ResolveField('scores', returns => [Score])
    async getScores(
        @Parent() parent: Subject,
        @Context() { scoresLoaderBySubject }: { scoresLoaderBySubject: DataLoader<ObjectId, ScoreResult> }
    ) {
        return (await scoresLoaderBySubject.load(parent._id)).result;
    }
}
