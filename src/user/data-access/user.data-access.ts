import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';

export class CreateUserData {
  @IsNotEmpty({ message: 'Please provide your first name' })
  firstName: string;

  @IsNotEmpty({ message: 'Please provide your last name' })
  lastName: string;

  @IsEmail({}, { message: 'Please provide a valid email' })
  @IsNotEmpty({ message: 'Please provide your email address' })
  emailAddress: string;

  @IsPhoneNumber('IN', { message: 'Please provide a valid phone number' })
  @IsNotEmpty({ message: 'Please provide your phone number' })
  phoneNumber: string;

  @MinLength(8, { message: 'Password is too short' })
  @IsNotEmpty({ message: 'Please provide a password' })
  password: string;
}

export class UserCredentialsData {
  @IsEmail({}, { message: 'Please provide a valid email' })
  @IsNotEmpty({ message: 'Email address should not be empty' })
  emailAddress: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;
}
