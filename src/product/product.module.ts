import { nanoid } from 'nanoid';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryModule } from '../category/category.module';
import { Product, ProductDocument, ProductSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        collection: 'Products',
        useFactory: () => {
          const schema = ProductSchema;

          schema.index(
            { name: 'text', description: 'text', gender: 'text', 'category.name': 'text', 'subcategory.name': 'text' },
            { name: 'text_search' },
          );

          schema.pre<ProductDocument>('save', function (next) {
            if (this.isNew) {
              const id = nanoid(12);
              const slug = this.name.toLowerCase().replace(/ /g, '-') + '-' + id;
              this.slug = slug;
            }
            next();
          });

          return schema;
        },
      },
    ]),
    CategoryModule,
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
