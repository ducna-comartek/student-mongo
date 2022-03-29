import { IsMongoId, IsNumberString, IsString } from 'class-validator';
import { ObjectId } from 'mongoose'

export class removeStudentDto {
    @IsMongoId()
    readonly id: string | ObjectId;
}
