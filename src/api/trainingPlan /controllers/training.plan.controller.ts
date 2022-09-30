import { Controller, Get, Req } from '@nestjs/common';
import { TrainingPlanService } from '../services/training.plan.service';
import {
  TrainingPlanPopulate,
  TrainingPlanProtection,
} from '../schemas/training.plan.schema';
import { LanguageCode } from 'src/globals/enums/language.code.enum';

// you can call this routes with http://localhost:3000/training-plans /with-aggregate or /with-mognoose

@Controller('training-plans')
export class TrainingPlanController {
  constructor(private readonly planService: TrainingPlanService) {}

  //! This is the route that works fine with the aggregate method
  @Get('/with-aggregate')
  async getPlansAggregate() {
    const userPlans = await this.planService.getPlansWithAggregate();
    return userPlans;
  }

  //! This is the route that does not work
  //! The language fields are not in da result (for example: exercise title and description)
  @Get('/with-mognoose')
  async getPlansWithMongoose() {
    const userPlans = await this.planService.find({
      conditions: {},
      projection: TrainingPlanProtection.DEFAULT(),
      populate: TrainingPlanPopulate.DEFAULT(LanguageCode.DE),
    });

    return userPlans;
  }
}
