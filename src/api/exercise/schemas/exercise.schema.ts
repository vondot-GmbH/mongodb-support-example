import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { LanguageCode } from 'src/globals/enums/language.code.enum';
import {
  LanguageString,
  LanguageStringSchema,
} from 'src/globals/schemas/language.string.schema';
import {
  Property,
  PropertyProtection,
} from '../../property/schemas/property.schema';
import { ExerciseInfo, ExerciseInfoSchema } from './exercise.info.schema';

export type ExerciseDocument = Exercise & Document;

export class ExerciseProtection {
  private static getLanguageProtection(languageCode = 'de') {
    return {
      title: `$title.${languageCode}`, // title is not in the result, only when you reaname the field "title" to titleX or something else
      description: `$description.${languageCode}`, // the same for description
      infos: {
        $map: {
          input: '$infos',
          in: {
            $mergeObjects: [
              '$$this',
              {
                label: `$$this.label.${languageCode}`,
              },
              {
                data: {
                  $map: {
                    input: '$$this.data',
                    as: 'data',
                    in: {
                      $mergeObjects: [
                        '$$data',
                        {
                          label: `$$data.label.${languageCode}`,
                        },
                        {
                          description: `$$data.description.${languageCode}`,
                        },
                      ],
                    },
                  },
                },
              },
            ],
          },
        },
      },
    };
  }

  private static getDefaultProtection() {
    return {
      coverImageUrl: 1,
      videoUrl: 1,
      traningsLevel: 1,
      executions: 1,
      preparations: 1,
      additionalInfos: 1,
      properties: 1,
      type: 1,
      muscleGroup: 1,
    };
  }

  static DEFAULT(languageCode?: LanguageCode): any {
    return {
      ...this.getLanguageProtection(languageCode),
      ...this.getDefaultProtection(),
    };
  }
}

export class ExercisePopulate {
  static DEFAULT(languageCode?: LanguageCode) {
    return [
      {
        path: 'properties',
        select: PropertyProtection.DEFAULT(languageCode),
      },
      {
        path: 'muscleGroup',
        select: PropertyProtection.DEFAULT(languageCode),
      },
    ];
  }
}

@Schema()
export class Exercise {
  @Prop({ schema: LanguageStringSchema })
  title: LanguageString;

  @Prop({ required: false, schema: LanguageStringSchema })
  description?: LanguageString;

  @Prop()
  coverImageUrl: string;

  @Prop({ required: false })
  videoUrl?: string;

  @Prop({ required: false })
  traningsLevel?: number;

  @Prop({ required: false, schema: ExerciseInfoSchema })
  infos?: ExerciseInfo[];

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Property',
    required: false,
  })
  properties?: Property[];

  @Prop({ required: false })
  templateVersion?: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Exercise',
    required: false,
  })
  template?: Exercise;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Property',
  })
  muscleGroup: Property;

  @Prop()
  type: string;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
