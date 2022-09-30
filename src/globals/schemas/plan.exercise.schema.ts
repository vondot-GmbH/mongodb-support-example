import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Exercise } from 'src/api/exercise/schemas/exercise.schema';
import { ExerciseSet, ExerciseSetSchema } from './exercise.set.schema';

export type PlanExerciseDocument = PlanExercise & Document;

@Schema()
export class PlanExercise {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Exercise',
  })
  exercise: Exercise;

  @Prop({ type: [ExerciseSetSchema] })
  sets: ExerciseSet[];

  @Prop({ required: false })
  durationInSeconds?: number;

  @Prop({ required: false })
  breakInSeconds?: number;

  @Prop({ required: false, default: false })
  isCompleted?: boolean;
}

export const PlanExerciseSchema = SchemaFactory.createForClass(PlanExercise);
