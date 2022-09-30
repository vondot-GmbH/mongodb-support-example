import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { LanguageCode } from 'src/globals/enums/language.code.enum';
import { TrainingPlanType } from 'src/globals/enums/training.plan.type.enum';
import {
  PlanExercise,
  PlanExerciseSchema,
} from 'src/globals/schemas/plan.exercise.schema';
import {
  ExercisePopulate,
  ExerciseProtection,
} from '../../exercise/schemas/exercise.schema';
export type TrainingPlanDocument = TrainingPlan & Document;

export class TrainingPlanProtection {
  private static getDefaultProtection() {
    return {
      title: 1,
      description: 1,
      type: 1,
      exercises: 1,
      subTitle: 1,
    };
  }

  static COPY_EXERCISES(): any {
    return {
      'exercises.exercise': 1,
      'exercises._id': 1,
      'exercises.sets.reps': 1,
      'exercises.sets.weight': 1,
      'exercises.sets.set': 1,
      'exercises.sets.type': 1,
      'exercises.sets._id': 1,
    };
  }

  static DEFAULT(): any {
    return {
      ...this.getDefaultProtection(),
    };
  }
}

export class TrainingPlanPopulate {
  static DEFAULT(languageCode?: LanguageCode): any {
    return [
      {
        path: 'exercises.exercise',
        select: ExerciseProtection.DEFAULT(languageCode),
        populate: ExercisePopulate.DEFAULT(languageCode),
      },
    ];
  }
}

@Schema()
export class TrainingPlan {
  @Prop()
  title: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: false })
  subTitle?: string;

  @Prop({ required: false })
  coverImageUrl?: string;

  @Prop({ required: false })
  coverColor?: string;

  @Prop({ enum: TrainingPlanType })
  type: string;

  @Prop({ type: [PlanExerciseSchema] })
  exercises: PlanExercise[];

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'TrainingPlan',
    required: false,
  })
  templateID?: TrainingPlan;
}

export const TrainingPlanSchema = SchemaFactory.createForClass(TrainingPlan);
