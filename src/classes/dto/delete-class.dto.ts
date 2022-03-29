import { IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export class removeClassDto {
    @IsMongoId()
    readonly id: string | ObjectId;
}
