import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Matches } from 'class-validator';

export class AppointmentCreateDto {
  @ApiProperty()
  @Matches(/^\d{5}$/, {
    message:
      'insuredId debe ser un número de 5 dígitos, incluidos los ceros iniciales.',
  })
  insuredId: string;

  @ApiProperty()
  @IsNumber()
  scheduleId: number;
}
