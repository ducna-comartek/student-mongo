import { Field, InputType } from '@nestjs/graphql';
import { MinLength, IsEnum, IsString, IsMongoId } from "class-validator";
import { ObjectId } from 'mongoose';

@InputType()
export class UpdateSubjectInput {
    @Field()
    @IsMongoId()
    _id!: string;

    @Field({ nullable: true })
    @IsString()
    @MinLength(1)
    name?: string;

    @Field({ nullable: true })
    @IsEnum({
        ONLINE: 'Online',
        OFFLINE: 'Offline'
    })
    type?: string;
}