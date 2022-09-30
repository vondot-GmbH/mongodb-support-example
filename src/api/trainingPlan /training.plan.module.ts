import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingPlanController } from './controllers/training.plan.controller';
import { TrainingPlanSchema } from './schemas/training.plan.schema';
import { TrainingPlanService } from './services/training.plan.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'TrainingPlan', schema: TrainingPlanSchema },
    ]),
  ],
  controllers: [TrainingPlanController],
  providers: [TrainingPlanService],
  exports: [TrainingPlanService],
})
export class TrainingPlanModule {}
