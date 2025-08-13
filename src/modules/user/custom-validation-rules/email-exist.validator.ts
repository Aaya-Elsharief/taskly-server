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
import { InternalServerErrorException } from 'src/utils/exception/internal-server-error-exception';
import { ErrorCodes } from 'src/utils/constants/error-codes';

@ValidatorConstraint({ name: 'emailIsExist', async: true })
@Injectable()
export class EmailIsExistConstraint implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  // Validates that the email doesn't already exist in the database
  public async validate(value: string, args: ValidationArguments) {
    if (!value) {
      return false;
    }

    try {
      const document = await this.userService.getOneUserBy({
        email: value,
      });

      if (document) {
        return false; // Email already exists
      }

      return true;
    } catch (error) {
      throw new InternalServerErrorException(ErrorCodes.INTERNAL_SERVER_ERROR);
    }
  }
  defaultMessage(args: ValidationArguments) {
    return JSON.stringify(ValidationErrorCodes['emailIsExist']);
  }
}

export function EmailIsExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: EmailIsExistConstraint,
    });
  };
}
