import { Field, InputType } from '@nestjs/graphql';
import { MinLength, IsEnum, IsString, IsMongoId, IsNumber, IsDate, IsOptional, IsBoolean } from "class-validator";
import { ObjectId } from 'mongoose';
import { Type } from 'class-transformer';

@InputType()
export class CreateScoreInput {
    @Field()
    @IsNumber()
    score!: number;

    @Field()
    @IsMongoId()
    student!: string;

    @Field()
    @IsMongoId()
    subject!: string;

    @Field({ nullable: true })
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    readonly dateToSendMail?: Date;

    @Field({ nullable: true })
    @IsBoolean()
    @IsOptional()
    @Type(() => Boolean)
    readonly hourToSendMail?: boolean;
}