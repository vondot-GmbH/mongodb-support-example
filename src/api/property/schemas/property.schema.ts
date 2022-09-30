import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LanguageCode } from 'src/globals/enums/language.code.enum';
import {
  LanguageString,
  LanguageStringSchema,
} from 'src/globals/schemas/language.string.schema';

export type PropertyDocument = Property & Document;

export class PropertyProtection {
  private static getLanguageProtection(languageCode = 'de') {
    return {
      title: `$title.${languageCode}`, // title is not in the result, only when you reaname the field "title" to titleX or something else
    };
  }

  private static getDefaultProtection() {
    return {
      type: 1,
      coverImageUrl: 1,
      coverIconUrl: 1,
    };
  }

  static DEFAULT(languageCode: LanguageCode): any {
    return {
      ...this.getLanguageProtection(languageCode),
      ...this.getDefaultProtection(),
    };
  }
}

@Schema()
export class Property {
  @Prop({ schema: LanguageStringSchema })
  title: LanguageString;

  @Prop()
  type: string;

  @Prop()
  coverImageUrl: string;

  @Prop({ required: false })
  coverIconUrl?: string;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
