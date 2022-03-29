import { IsMongoId, IsOptional } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CheckExistStudentDto {
    @IsMongoId()
    @IsOptional()
    readonly _id?: ObjectId;

    @IsMongoId()
    @IsOptional()
    readonly class?: string;
}