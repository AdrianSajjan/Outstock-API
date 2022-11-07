import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';

import { SiteDocument } from './schema';
import { Public } from '../shared/decorator';
import { SiteService } from './site.service';

@Controller('site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Public()
  @Get('/:slug')
  fetchData(@Param('slug') slug: string): Observable<SiteDocument> {
    return this.siteService.fetchDataBySlug(slug);
  }
}
