import { ProductDocument } from '../../product/schema';

export class UpdateCartData {
  product: ProductDocument;
  quantity: number;
  size?: string;
}
