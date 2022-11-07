import { IsNotEmpty, Length } from 'class-validator';

export class AddAddressData {
  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  @Length(6, 6)
  pinCode: string;

  @IsNotEmpty()
  addressLineOne: string;

  addressLineTwo?: string;

  @IsNotEmpty()
  cityOrDistrict: string;
}
