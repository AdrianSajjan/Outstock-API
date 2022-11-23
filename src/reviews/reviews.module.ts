import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './schema/review.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Review.name,
        collection: 'Reviews',
        useFactory: () => {
          const schema = ReviewSchema;

          schema.pre(/^find/, function (next) {
            this.populate({ path: 'user', select: 'firstName lastName', strictPopulate: false });
            next();
          });

          return schema;
        },
      },
    ]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
