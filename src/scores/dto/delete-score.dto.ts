import { IsString } from 'class-validator'

export class removeScoreDto {
    @IsString()
    id: string;
}
