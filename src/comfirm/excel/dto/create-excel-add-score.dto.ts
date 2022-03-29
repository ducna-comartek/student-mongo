import { IsString, IsEmail, Length, IsNumber, IsObject } from 'class-validator';
import { Student } from 'src/students/entities/student.schema';

export class CreateExcelAddScoreDto {
    readonly student: Student;

    @IsString()
    @Length(1, 100)
    readonly subject: string;

    @IsString()
    @Length(1, 100)
    readonly class: string;

    @IsNumber()
    readonly score: number;
}
