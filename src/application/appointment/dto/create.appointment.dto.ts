import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export type AppointmentStatus = 'pending' | 'completed' | 'failed';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  insuredId: string;

  @IsNumber()
  @Type(() => Number)
  scheduleId: number;

  @IsEnum(['PE', 'CL'])
  countryISO: 'PE' | 'CL';

  @IsEnum(['pending', 'completed', 'failed'])
  @IsOptional()
  status?: AppointmentStatus = 'pending';

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  createdAt?: Date = new Date();

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  updatedAt?: Date = new Date();
}
