import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LanguageStringDocument = LanguageString & Document;

@Schema()
export class LanguageString {
  @Prop()
  de: string;

  @Prop({ required: false })
  en?: string;
}

export const LanguageStringSchema =
  SchemaFactory.createForClass(LanguageString);
