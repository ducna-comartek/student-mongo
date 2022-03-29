import { IsString } from 'class-validator';

export class removeSubjectDto {
    @IsString()
    readonly id: string
}
