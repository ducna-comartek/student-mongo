import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Score } from 'src/scores/entities/score.schema';

export type SubjectDocument = Subject & Document;

@Schema({ timestamps: true, id: true })
@ObjectType()
export class Subject {
    @Transform(({ value }) => value.toString())
    @Field(type => ID)
    _id: mongoose.ObjectId;

    @Prop({ required: true })
    @Field()
    name: string;

    @Prop({ required: true })
    @Field()
    type: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Score' }] })
    @Field(type => [Score])
    scores: Score[];
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);