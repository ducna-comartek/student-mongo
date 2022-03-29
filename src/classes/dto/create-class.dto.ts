import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateClassDto {
    @IsString()
    @Length(1, 50)
    readonly name: string;

    @IsString()
    @Length(10, 100)
    readonly teacherName: string;
}
