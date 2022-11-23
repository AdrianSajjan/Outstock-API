import { Controller, Post, Body } from '@nestjs/common';
import { from } from 'rxjs';
import { CurrentUser } from '../shared/decorator';
import { UserPayload } from '../shared/interface';
import { AddReviewData } from './data-access/';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  addReview(@CurrentUser() user: UserPayload, @Body() data: AddReviewData) {
    return from(this.reviewsService.createReview(user, data));
  }
}
