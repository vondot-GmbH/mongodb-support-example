import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExerciseSchema } from './schemas/exercise.schema';
import { ExerciseService } from './services/exercise.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Exercise', schema: ExerciseSchema, collection: 'exercises' },
    ]),
  ],
  controllers: [],
  providers: [ExerciseService],
  exports: [ExerciseService],
})
export class ExerciseModule {}
