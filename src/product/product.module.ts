import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';
import { Request } from 'express';
import * as multerS3 from 'multer-s3';

import { Config } from '../config';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, ProductSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema, collection: 'Products' }]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<Config>) => ({
        storage: multerS3({
          s3: new AWS.S3({
            credentials: {
              accessKeyId: configService.get('s3.accessKeyID', { infer: true }),
              secretAccessKey: configService.get('s3.secretAccessKey', { infer: true }),
            },
            region: configService.get('s3.region', { infer: true }),
          }),
          bucket: configService.get('s3.bucketName', { infer: true }),
          acl: 'public-read',
          key: function (_: Request, file: Express.Multer.File, cb: Function) {
            const date = new Date();
            cb(null, `${date.toISOString()}-${file.originalname}`);
          },
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
