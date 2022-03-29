import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateScoreDto {
    @IsNumber()
    @Min(0)
    @Max(10)
    @IsOptional()
    readonly score?: number;
}
