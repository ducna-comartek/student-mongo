import { Field, InputType, ID } from "@nestjs/graphql";
import { IsMongoId } from "class-validator";

@InputType()
export class removeStudentInput {
    @Field(type => ID)
    @IsMongoId()
    _id: string;
}