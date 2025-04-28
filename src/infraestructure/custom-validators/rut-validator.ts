import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { format, validate } from 'rut.js';

@ValidatorConstraint({ name: 'RutValidator', async: false })
export class RutValidator implements ValidatorConstraintInterface {
  validate(rut: string, args: ValidationArguments) {
    return validate(format(rut)); // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Rut ($value) is not valid!';
  }
}
