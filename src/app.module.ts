import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExerciseModule } from './api/exercise/exercise.module';
import { PropertyModule } from './api/property/property.module';
import { TrainingPlanModule } from './api/trainingPlan /training.plan.module';

@Module({
  imports: [
    ExerciseModule,
    PropertyModule,
    TrainingPlanModule,
    MongooseModule.forRoot(
      'mongodb+srv://gymo-dev:7B4yayn8a18E63uyDJ782C661@gymo.kxg4n.mongodb.net/gymo-development?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
