import { Column, Entity } from 'typeorm';

@Entity()
export class Address {
  @Column()
  state: string;

  @Column()
  pinCode: string;

  @Column()
  addressLineOne: string;

  @Column()
  addressLineTwo?: string;

  @Column()
  cityOrDistrict: string;
}
