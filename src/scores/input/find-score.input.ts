import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId } from "class-validator";

@InputType()
export class FindScoreInput {
    @Field()
    @IsMongoId()
    _id!: string;
}