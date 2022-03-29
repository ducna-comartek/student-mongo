import { IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';
import { Student } from 'src/students/entities/student.schema';

export class UpdateClassDto {
    // @IsMongoId()
    // readonly id: ObjectId;

    @IsString()
    @IsOptional()
    @MinLength(1)
    @MaxLength(50)
    readonly name?: string;

    @IsNumber()
    @IsOptional()
    @Min(20)
    @Max(50)
    readonly totalMember?: number;

    @IsString()
    @IsOptional()
    @MinLength(10)
    @MaxLength(100)
    readonly teacherName?: string;

    @IsOptional()
    readonly students?: Student[];
}
