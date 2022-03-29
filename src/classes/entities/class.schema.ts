import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Student } from 'src/students/entities/student.schema';

export type ClassDocument = Class & Document;

@Schema({ timestamps: true, id: true })
@ObjectType()
export class Class {
    @Field(() => ID)
    _id: ObjectId;

    @Prop({ required: true })
    @Field()
    name: string;

    @Prop({ required: true, default: 0 })
    @Field()
    totalMember: number;

    @Prop({ required: true })
    @Field()
    teacherName: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }] })
    @Field(type => [Student], { nullable: 'itemsAndList' })
    students: Student[];
}

const ClassSchema = SchemaFactory.createForClass(Class);

export { ClassSchema };
