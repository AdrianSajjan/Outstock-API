import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FetchProductData } from './data-access';
import { Product, ProductDocument } from './schema';
import { from, Observable } from 'rxjs';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) {}

  findAllProducts(fetchProductData: FetchProductData): Observable<ProductDocument[]> {
    const { limit, page, ...query } = fetchProductData;
    console.log(query);
    return from(
      this.productModel
        .find({})
        .skip(page * limit)
        .limit(limit)
        .exec(),
    );
  }
}
