import { HttpStatus } from '@nestjs/common';
import { errorCodes } from '../../config/error-messages';
import { IDtoErrorException } from '../interfaces/dto-error-exception.interface';
import { ErrorException } from '../interfaces/error-response.interface';

export class DatabaseException implements IDtoErrorException {
  validate(exception) {
    return exception?.code === 'ER_DUP_ENTRY';
  }

  returnValidation(error, exception): ErrorException {
    if (exception.message.includes('Duplicate entry')) {
      return {
        status: HttpStatus.BAD_REQUEST,
        code: errorCodes.DUPLICATE_KEY.code,
        message: errorCodes.DUPLICATE_KEY.message,
      };
    }
  }
}
