import { Field, InputType } from '@nestjs/graphql';
import { MinLength, IsEnum, IsString } from "class-validator";


@InputType()
export class CreateSubjectInput {
    @Field()
    @IsString()
    @MinLength(1)
    name!: string;

    @Field()
    @IsEnum({
        ONLINE: 'Online',
        OFFLINE: 'Offline'
    })
    type!: string;
}