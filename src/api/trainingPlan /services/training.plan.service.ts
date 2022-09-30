import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericCrudService } from 'src/globals/services/generic.crud.service';
import {
  TrainingPlanDocument,
  TrainingPlan,
} from '../schemas/training.plan.schema';

@Injectable()
export class TrainingPlanService extends GenericCrudService<TrainingPlanDocument> {
  constructor(
    @InjectModel(TrainingPlan.name) readonly plan: Model<TrainingPlanDocument>,
  ) {
    super(plan);
  }

  //! HOTFIX

  getPlansWithAggregate = async () => {
    const result = await this.plan.aggregate([
      {
        $match: {
          type: 'TEMPLATE_PLAN',
        },
      },
      {
        $lookup: {
          from: 'exercises',
          localField: 'exercises.exercise',
          foreignField: '_id',
          pipeline: [
            {
              $project: {
                title: '$title.de',
                description: '$description.de',
                infos: {
                  $map: {
                    input: '$infos',
                    in: {
                      $mergeObjects: [
                        '$$this',
                        {
                          label: '$$this.label.de',
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
                                    label: '$$data.label.de',
                                  },
                                  {
                                    description: '$$data.description.de',
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
                coverImageUrl: 1,
                videoUrl: 1,
                traningsLevel: 1,
                executions: 1,
                preparations: 1,
                additionalInfos: 1,
                properties: 1,
                type: 1,
                muscleGroup: 1,
              },
            },
            {
              $lookup: {
                from: 'properties',
                localField: 'properties',
                foreignField: '_id',
                pipeline: [
                  {
                    $project: {
                      title: '$title.de',
                      type: 1,
                      coverImageUrl: 1,
                      coverIconUrl: 1,
                    },
                  },
                ],
                as: 'properties',
              },
            },
            {
              $lookup: {
                from: 'properties',
                localField: 'muscleGroup',
                foreignField: '_id',
                pipeline: [
                  {
                    $project: {
                      title: '$title.de',
                      type: 1,
                      coverImageUrl: 1,
                      coverIconUrl: 1,
                    },
                  },
                ],
                as: 'muscleGroup',
              },
            },
            {
              $unwind: '$muscleGroup',
            },
          ],
          as: 'exercises.exercise',
        },
      },
    ]);

    return result;
  };
}
