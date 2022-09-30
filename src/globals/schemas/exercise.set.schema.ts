import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExerciseSetDocument = ExerciseSet & Document;

@Schema()
export class ExerciseSet {
  @Prop()
  type: string;

  @Prop()
  set: number;

  @Prop()
  weight: number;

  @Prop()
  reps: number;

  @Prop({ required: false, default: false })
  isCompleted?: boolean;
}

export const ExerciseSetSchema = SchemaFactory.createForClass(ExerciseSet);
