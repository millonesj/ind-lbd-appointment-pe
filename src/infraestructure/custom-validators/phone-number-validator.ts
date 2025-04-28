import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'PhoneNumberFormat', async: false })
export class PhoneNumberFormatValidator
  implements ValidatorConstraintInterface
{
  validate(phoneNumber: string, args: ValidationArguments) {
    // Use a regular expression to check if the phone number matches the format
    const phoneNumberRegex = /^\+56\s9\s\d{4}\s\d{4}$/;
    return phoneNumberRegex.test(phoneNumber);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Invalid phone number format. It should be in the format "+56 9 9999 9999"';
  }
}
