import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import {
  LanguageString,
  LanguageStringSchema,
} from 'src/globals/schemas/language.string.schema';

export type InfoDataDocument = InfoData & Document;

@Schema()
export class InfoData {
  @Prop({ schema: LanguageStringSchema })
  label: LanguageString;

  @Prop({ schema: LanguageStringSchema, required: false })
  description?: LanguageString;
}

export const InfoDataSchema = SchemaFactory.createForClass(InfoData);

//! - - -

export type ExerciseInfoDocument = ExerciseInfo & Document;

@Schema()
export class ExerciseInfo {
  @Prop({ schema: LanguageStringSchema })
  label: LanguageString;

  @Prop({ _id: false, schema: InfoDataSchema })
  data: InfoData[];
}

export const ExerciseInfoSchema = SchemaFactory.createForClass(ExerciseInfo);
