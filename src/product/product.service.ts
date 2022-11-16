import { Model, Aggregate } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schema';
import { FetchProductQueryData } from './data-access';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) {}

  async findAllProducts(query: Partial<FetchProductQueryData>) {
    const { sort, price, limit = 0, page = 1, category } = query;

    console.log(sort);

    const prices = price?.map(({ $gt, $lt }) => ({ price: { $gt, $lt } }));

    const filter = { $and: [{ category }, prices?.length ? { $or: prices } : {}] };

    const facet: Array<any> = [{ $match: filter }, { $skip: (page - 1) * limit }];
    if (limit > 0) facet.push({ $limit: limit });

    return from(
      this.productModel.aggregate([
        {
          $lookup: { from: 'Categories', localField: 'category', foreignField: '_id', as: 'category_details' },
        },
        { $unwind: { path: '$category_details' } },
        { $set: { category: '$category_details.name' } },
        {
          $facet: {
            products: [...facet, { $set: { category: '$category_details' } }, { $unset: 'category_details' }],
            total: [{ $match: filter }, { $group: { _id: null, count: { $sum: 1 } } }],
          },
        },
        { $unwind: { path: '$total', preserveNullAndEmptyArrays: true } },
        { $project: { products: 1, total: { $ifNull: ['$total.count', 0] } } },
      ]),
    ).pipe(map(([result]) => result));
  }

  findProductBySlug(slug: string): Observable<ProductDocument> {
    return from(this.productModel.findOne({ slug }));
  }
}
