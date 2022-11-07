import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Site, SiteDocument } from './schema';
import { from, Observable } from 'rxjs';

@Injectable()
export class SiteService {
  constructor(@InjectModel(Site.name) private readonly siteModel: Model<SiteDocument>) {}

  fetchDataBySlug(slug: string): Observable<SiteDocument> {
    return from(this.siteModel.findOne({ slug }));
  }
}
