import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { from, map, Observable, switchMap } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schema';
import { FetchProductQueryData } from './data-access';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) {}

  async findAllProducts(query: FetchProductQueryData) {
    const { price, limit = 50, page = 1, category, subcategory } = query;

    const prices = price ? (price.length ? price.map(({ $gt, $lt }) => ({ price: { $gt, $lt } })) : null) : null;

    const filter = {
      $and: [
        category ? { 'category.name': category } : {},
        subcategory ? { 'subcategory.name': subcategory } : {},
        prices ? { $or: prices } : {},
      ],
    };

    const skip = (page - 1) * limit;

    return from(this.productModel.find(filter).skip(skip).limit(limit)).pipe(
      switchMap((products) => {
        return from(this.productModel.countDocuments(filter)).pipe(
          map((total: number) => {
            return { products, total };
          }),
        );
      }),
    );
  }

  findProductsByTextSearch(search: string) {
    return from(
      this.productModel.find({ $text: { $search: search } }, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } }),
    );
  }

  findProductBySlug(slug: string): Observable<ProductDocument> {
    return from(this.productModel.findOne({ slug }));
  }
}
