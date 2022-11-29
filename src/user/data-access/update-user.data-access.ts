import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class UpdateUserData {
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
}
