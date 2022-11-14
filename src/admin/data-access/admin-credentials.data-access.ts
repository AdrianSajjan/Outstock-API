import { IsEmail, IsNotEmpty } from 'class-validator';

export class AdminCredentialsData {
  @IsEmail()
  @IsNotEmpty()
  emailAddress: string;

  @IsNotEmpty()
  password: string;
}
