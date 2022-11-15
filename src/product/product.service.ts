import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schema';
import { from, Observable } from 'rxjs';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) {}

  findAllProducts(): Observable<ProductDocument[]> {
    return from(this.productModel.find().exec());
  }

  findProductBySlug(slug: string): Observable<ProductDocument> {
    return from(this.productModel.findOne({ slug }));
  }
}
