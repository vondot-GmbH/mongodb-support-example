import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericCrudService } from 'src/globals/services/generic.crud.service';
import { PropertyDocument, Property } from '../schemas/property.schema';

@Injectable()
export class PropertyService extends GenericCrudService<PropertyDocument> {
  constructor(
    @InjectModel(Property.name) readonly property: Model<PropertyDocument>,
  ) {
    super(property);
  }
}
