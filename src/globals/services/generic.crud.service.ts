import { Injectable } from '@nestjs/common';
import { Document, Model } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export abstract class GenericCrudService<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  //! DEFAULT CRUD METHODS

  async find(args: {
    conditions: Partial<Record<keyof T, unknown>> | any;
    projection?: string | Record<string, unknown> | any;
    options?: Record<string, unknown>;
    populate?: any[];
  }): Promise<T[]> {
    let aggregationPipeline = [];

    if (args.conditions) {
      aggregationPipeline.push({ $match: prepareCondition(args.conditions) });
    }

    if (args.projection) {
      aggregationPipeline.push({ $project: args.projection });
    }

    if (args.options) {
      aggregationPipeline = [
        ...aggregationPipeline,
        ...handleGenericOptions(args.options),
      ];
    }

    let result = await this.model.aggregate(aggregationPipeline);

    if (args.populate) {
      result = await this.model.populate(result, args.populate);
    }

    console.log('args.projection');
    console.log(JSON.stringify(args.populate));

    return result;
  }

  //! ... more methods (create, update, delete, etc.) ...
}

export const prepareCondition = (condition: any) => {
  const objKeys = Object.keys(condition);

  for (let i = 0; i < objKeys.length; i++) {
    const objectKey = objKeys[i];
    const objectValue = condition[objectKey];

    if (typeof objectValue === 'object') {
      condition[objectKey] = prepareCondition(objectValue);
    }

    if (ObjectId.isValid(objectValue)) {
      condition[objectKey] = new ObjectId(objectValue);
    }
  }

  return condition;
};

const handleGenericOptions = (options: any) => {
  const aggregationPipeline = [];

  if (options.skip) {
    aggregationPipeline.push({ $skip: options.skip });
  }

  if (options.limit) {
    aggregationPipeline.push({ $limit: options.limit });
  }

  if (options.sort) {
    aggregationPipeline.push({ $sort: options.sort });
  }

  return aggregationPipeline;
};
