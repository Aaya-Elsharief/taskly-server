import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { ValidationErrorCodes } from 'src/utils/constants/validation-error-codes';
import { UserService } from '../service/user.service';

@ValidatorConstraint({ name: 'mobileIsExist', async: true })
@Injectable()
export class MobileIsExistConstraint implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  // Validates that the mobile number doesn't already exist in the database
  public async validate(value: string, args: ValidationArguments) {
    if (!value) {
      return false;
    }

    try {
      const document = await this.userService.getOneUserBy({
        mobileNumber: value,
      });

      if (document) {
        return false; // Mobile number already exists
      }

      return true;
    } catch (error) {
      console.error('Database error during mobile number validation:', error);
      return false; // Fail validation on database error
    }
  }
  defaultMessage(args: ValidationArguments) {
    return JSON.stringify(ValidationErrorCodes['mobileIsExist']);
  }
}

export function MobileIsExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: MobileIsExistConstraint,
    });
  };
}
