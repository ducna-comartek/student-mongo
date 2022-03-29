import { IsEnum, IsNumberString, IsOptional, Max, Min } from "class-validator";

export class FilterOutcomeDto {
    @IsOptional()
    @IsEnum({
        GOOD: 'GOOD',
        AVERAGE: 'AVG',
        BAD: 'BAD',
    })
    readonly grading: string;

    @IsNumberString()
    @IsOptional()
    readonly limit?: number;

    @IsNumberString()
    @IsOptional()
    readonly offset?: number
}