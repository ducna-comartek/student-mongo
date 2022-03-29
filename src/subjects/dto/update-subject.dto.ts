import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { Score } from 'src/scores/entities/score.schema';

export class UpdateSubjectDto {
    @IsString()
    @IsOptional()
    @Length(1, 50)
    readonly name?: string;

    @IsEnum({
        ONLINE: 'Online',
        OFFLINE: 'Offline'
    })
    @IsOptional()
    readonly type?: string

    @IsOptional()
    readonly scores?: Score[]
}
