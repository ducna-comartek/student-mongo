import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId } from "class-validator";
import { ObjectId } from 'mongoose';

@InputType()
export class removeSubjectInput {
    @Field()
    @IsMongoId()
    _id!: string;
}