import { Field, InputType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { IsDate, MinLength, IsEnum, IsMongoId, IsEmail } from "class-validator";


@InputType()
export class UpdateStudentInput {
    @Field()
    @IsMongoId()
    _id!: string;

    @Field({ nullable: true })
    @MinLength(1)
    name?: string;

    @Field({ nullable: true })
    dob?: Date;

    @Field({ nullable: true })
    gender?: string;

    @Field({ nullable: true })
    email?: string;

    @Field({ nullable: true })
    class?: string;
}