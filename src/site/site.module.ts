import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Site, SiteSchema } from './schema';
import { SiteController } from './site.controller';
import { SiteService } from './site.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Site.name, schema: SiteSchema, collection: 'Site' }])],
  controllers: [SiteController],
  providers: [SiteService],
})
export class SiteModule {}
