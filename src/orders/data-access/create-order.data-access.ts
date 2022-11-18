export class CreateTransactionAndOrderData {
  cart: string;
  state: string;
  pinCode: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  totalAmount: number;
  addressLineOne: string;
  addressLineTwo: string;
  cityOrDistrict: string;
}

export class CreateOrderData {
  cart: string;
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
