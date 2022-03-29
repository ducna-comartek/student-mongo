import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Class } from 'src/classes/entities/class.schema';
import { Score } from 'src/scores/entities/score.schema';

export type StudentDocument = Student & Document & { getAvgScore(): Promise<number> };

@Schema({ timestamps: true, id: true })
@ObjectType()
export class Student {
    @Transform(({ value }) => value.toString())
    @Field(type => ID)
    _id: mongoose.ObjectId;

    @Prop({ required: true })
    @Field()
    name: string;

    @Prop({ required: true })
    @Field()
    dob: Date;

    @Prop({ required: true })
    @Field()
    gender: string;

    @Prop({ required: true })
    @Field()
    email: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Class' })
    @Field(type => Class)
    class: Class;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Score' }] })
    @Field(type => [Score])
    scores: Score[];
}

const StudentSchema = SchemaFactory.createForClass(Student);

StudentSchema.methods.getAvgScore = async function (): Promise<number> {
    const student = this as StudentDocument;
    return student.scores ? student.scores.reduce((result, { score }) => result + score, 0) / student.scores.length : 0;
};

export { StudentSchema };

@ObjectType()
export class StudentResult {
    key: string;

    result: Student[];
}