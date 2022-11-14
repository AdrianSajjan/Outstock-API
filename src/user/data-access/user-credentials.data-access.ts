import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserCredentialsData {
  @IsEmail({}, { message: 'Please provide a valid email' })
  @IsNotEmpty({ message: 'Email address should not be empty' })
  emailAddress: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;
}
