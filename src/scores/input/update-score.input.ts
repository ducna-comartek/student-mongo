import { Field, InputType } from '@nestjs/graphql';
import { MinLength, IsEnum, IsString, IsMongoId, IsNumber } from "class-validator";
import { ObjectId } from 'mongoose';

@InputType()
export class UpdateScoreInput {
    @Field()
    @IsMongoId()
    _id!: string;

    @Field({ nullable: true })
    @IsNumber()
    score?: number;
}