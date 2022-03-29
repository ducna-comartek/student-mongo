import { Field, InputType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { IsDate, MinLength, IsEnum, IsMongoId, IsEmail } from "class-validator";


@InputType()
export class CreateStudentInput {
    @Field()
    @MinLength(1)
    name!: string;

    @Field()
    @IsDate()
    dob!: Date;

    @Field()
    @IsEnum({
        MALE: 'Male',
        FEMALE: 'Female',
        OTHER: 'Other',
    })
    gender!: string;

    @Field()
    @IsEmail()
    email!: string;

    @Field()
    @IsMongoId()
    class!: string;
}