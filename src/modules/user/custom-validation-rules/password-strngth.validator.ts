import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
} from 'class-validator';
import { ValidationErrorCodes } from 'src/utils/constants/validation-error-codes';

@Injectable()
@ValidatorConstraint({ name: 'passwordStrength', async: false })
export class PasswordStrengthConstraint
  implements ValidatorConstraintInterface
{
  validate(value: string, args: ValidationArguments) {
    if (!value) {
      return false;
    }

    // Check individual password requirements
    const hasLowercase = /[a-z]/.test(value);
    const hasUppercase = /[A-Z]/.test(value);
    const hasDigit = /\d/.test(value);
    const hasSpecialChar = /[@$!%*?&]/.test(value);
    const hasMinLength = value.length >= 8;

    return (
      hasLowercase && hasUppercase && hasDigit && hasSpecialChar && hasMinLength
    );
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return JSON.stringify({
      code: ValidationErrorCodes.passwordStrength,
    });
  }
}

export function PasswordStrength(validationOptions?: any) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: PasswordStrengthConstraint,
    });
  };
}
