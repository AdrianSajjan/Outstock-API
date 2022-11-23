import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './schema/';
import { AddReviewData } from './data-access';
import { from, Observable } from 'rxjs';
import { UserPayload } from 'src/shared/interface';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review.name) private readonly reviewModel: Model<ReviewDocument>) {}

  createReview(user: UserPayload, data: AddReviewData): Observable<ReviewDocument> {
    return from(this.reviewModel.create({ user: user.id, ...data }));
  }
}
