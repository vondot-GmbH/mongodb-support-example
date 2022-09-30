import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertySchema } from './schemas/property.schema';
import { PropertyService } from './services/property.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Property', schema: PropertySchema }]),
  ],
  controllers: [],
  providers: [PropertyService],
  exports: [PropertyService],
})
export class PropertyModule {}
