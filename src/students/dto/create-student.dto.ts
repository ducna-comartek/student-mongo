import { Expose, Type, TypeOptions } from 'class-transformer';
import { IsEnum, IsNumber, IsString, IsDate, IsEmail, Length, IsObject, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';
import { Class } from 'src/classes/entities/class.schema';

export class CreateStudentDto {
    @IsString()
    @Length(10, 100)
    readonly name: string;

    @Type(() => Date)
    @IsDate()
    readonly dob: Date;

    @IsEnum({
        MALE: 'Male',
        FEMALE: 'Female',
        OTHER: 'Other',
    })
    readonly gender: string;

    @IsEmail()
    readonly email: string;

    @IsMongoId()
    readonly class: string;
}
