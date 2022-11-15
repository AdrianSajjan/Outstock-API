import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { nanoid } from 'nanoid';

import { Config } from '../config';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, ProductDocument, ProductSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        collection: 'Products',
        useFactory: () => {
          const schema = ProductSchema;
          schema.pre<ProductDocument>('save', function (next) {
            if (this.isNew) {
              const id = nanoid(12);
              const slug = this.name.toLowerCase().replace(/ /g, '-') + '-' + id;
              this.slug = slug;
            }
            next();
          });
          schema.pre<ProductDocument>(/^find/, function (next) {
            this.populate('category subcategory');
            next();
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

// Multer for AWS
// MulterModule.registerAsync({
//   imports: [ConfigModule],
//   useFactory: async (configService: ConfigService<Config>) => ({
//     storage: multerS3({
//       s3: new AWS.S3({
//         credentials: {
//           accessKeyId: configService.get('s3.accessKeyID', { infer: true }),
//           secretAccessKey: configService.get('s3.secretAccessKey', { infer: true }),
//         },
//         region: configService.get('s3.region', { infer: true }),
//       }),
//       bucket: configService.get('s3.bucketName', { infer: true }),
//       acl: 'public-read',
//       key: function (_: Request, file: Express.Multer.File, cb: Function) {
//         const date = new Date();
//         cb(null, `${date.toISOString()}-${file.originalname}`);
//       },
//     }),
//   }),
//   inject: [ConfigService],
// }),
