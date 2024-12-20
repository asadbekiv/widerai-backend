'use strict';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type Examdocument = HydratedDocument<Exam>;

export class Exam {
  @Prop({ required: true })
  topic_name: string;
  @Prop({ required: true })
  score: string;
  @Prop({ required: true })
  price: string;
  @Prop({ required: true })
  level: string;
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
