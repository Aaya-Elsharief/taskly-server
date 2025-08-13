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

    // Single regex with lookaheads for all password requirements
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return passwordRegex.test(value);
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
