import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { ErrorCodes } from 'src/utils/constants/error-codes';
import { ValidationErrorCodes } from 'src/utils/constants/validation-error-codes';

@ValidatorConstraint({ name: 'isValidMobile', async: false })
@Injectable()
export class IsValidMobileConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    if (!value) {
      return false;
    }

    const parts = value.split('-');

    if (parts.length !== 3) {
      return false;
    }

    const [countryCode, areaCode, number] = parts;

    const phoneUtil = PhoneNumberUtil.getInstance();

    // Check if country code corresponds to a valid region
    const regionForCountryCode = phoneUtil.getRegionCodeForCountryCode(
      parseInt(countryCode),
    );

    if (!regionForCountryCode || regionForCountryCode === 'ZZ') {
      return false;
    }

    const fullNumber = `+${countryCode}${areaCode}${number}`;

    try {
      const parsedNumber = phoneUtil.parseAndKeepRawInput(fullNumber, null);
      return phoneUtil.isValidNumber(parsedNumber);
    } catch (error) {
      throw new InternalServerErrorException(ErrorCodes.INTERNAL_SERVER_ERROR);
    }
  }

  defaultMessage(args: ValidationArguments) {
    return JSON.stringify(ValidationErrorCodes['isValidMobile']);
  }
}

export function IsValidMobile(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidMobileConstraint,
    });
  };
}
