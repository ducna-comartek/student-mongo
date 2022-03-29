import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import mongoose from 'mongoose';
import { Student } from 'src/students/entities/student.schema';
import { Subject } from 'src/subjects/entities/subject.schema';

export type ScoreDocument = Score & Document;

@Schema({ timestamps: true, id: true })
@ObjectType()
export class Score {
    @Transform(({ value }) => value.toString())
    @Field(type => ID)
    _id: mongoose.ObjectId;

    @Prop({ required: true })
    @Field()
    score: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Student' })
    @Field(type => Student)
    student: Student;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' })
    @Field(type => Subject)
    subject: Subject;
}

export const ScoreSchema = SchemaFactory.createForClass(Score);

@ObjectType()
export class ScoreResult {
    key: string;

    result: Score[];
}