import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericCrudService } from 'src/globals/services/generic.crud.service';
import { ExerciseDocument } from '../schemas/exercise.schema';

@Injectable()
export class ExerciseService extends GenericCrudService<ExerciseDocument> {
  constructor(
    @InjectModel('Exercise')
    readonly exercise: Model<ExerciseDocument>,
  ) {
    super(exercise);
  }
}
