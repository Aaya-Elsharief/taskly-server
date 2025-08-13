import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { MobileIsExist } from '../custom-validation-rules/mobile-number-exist.validator';
import { IsValidMobile } from '../custom-validation-rules/mobile-number.validator';
import { PasswordStrength } from '../custom-validation-rules/password-strength.validator';
import { EmailIsExist } from '../custom-validation-rules/email-exist.validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john@mail.com',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  @EmailIsExist()
  email: string;

  @ApiProperty({
    description: 'The mobile number in format: countryCode-areaCode-number',
    example: '966-50-2388427',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsValidMobile()
  @MobileIsExist()
  mobileNumber: string;

  @ApiProperty({
    description:
      'Password for the user account with minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character',
    example: 'Password123!',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @PasswordStrength()
  password: string;
}
