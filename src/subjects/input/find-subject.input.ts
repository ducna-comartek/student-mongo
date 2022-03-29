import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId } from "class-validator";
import { ObjectId } from 'mongoose';

@InputType()
export class FindSubjectInput {
    @Field()
    @IsMongoId()
    _id!: string;
}