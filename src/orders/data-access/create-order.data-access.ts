import { Products } from '../schema/products.schema';

export class CreateOrderData {
  products: Products;
  totalAmount: number;
  status: string;
  oid: string;
  state: string;
  pinCode: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  addressLineOne: string;
  addressLineTwo: string;
  cityOrDistrict: string;
}
