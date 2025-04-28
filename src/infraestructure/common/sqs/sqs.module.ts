// src/infraestructure/sqs/sqs.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from 'src/domain/appointment.entity';
import { SqsConsumerHandler } from './appointment.handler';
import { AppointmentService } from 'src/application/appointment/appointment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  providers: [SqsConsumerHandler, AppointmentService],
})
export class SqsModule {}
