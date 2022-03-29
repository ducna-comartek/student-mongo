import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";

@InputType()
export class CreateClassInput {
    @Field()
    @MinLength(1)
    name!: string;

    @Field()
    @MinLength(1)
    teacherName!: string;
}