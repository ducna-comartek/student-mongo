import { Expose, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, IsDate, IsEmail, IsOptional, Length } from 'class-validator';
import { Class } from 'src/classes/entities/class.schema';
import { Score } from 'src/scores/entities/score.schema';

export class UpdateStudentDto {
    @IsString()
    @Length(10, 100)
    @IsOptional()
    readonly name?: string;

    @Type(() => Date)
    @IsDate()
    @IsOptional()
    readonly dob?: Date;

    @IsEnum({
        MALE: 'Male',
        FEMALE: 'Female',
        OTHER: 'Other',
    })
    @IsOptional()
    readonly gender?: string;

    @IsEmail()
    @IsOptional()
    readonly email?: string;

    @IsOptional()
    readonly class?: string;

    @IsOptional()
    readonly scores?: Score[]
}
