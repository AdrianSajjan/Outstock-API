import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;

  @Column()
  emailAddress: string;

  @Column()
  isActive: boolean;

  @Column()
  password: string;

  @Column()
  isEmailVerfied: boolean;

  @Column()
  isPhoneNumberVerified: boolean;

  @Column()
  whitelistedRefreshTokens: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
