import { Injectable, Logger } from '@nestjs/common';
import { Appointment } from 'src/domain/appointment.entity';
import { SQSRecord } from 'aws-lambda';
import { AppointmentService } from 'src/application/appointment/appointment.service';

@Injectable()
export class EventHandlerService {
  constructor(
    private readonly logger: Logger,
    private readonly appointmentService: AppointmentService,
  ) {}

  async handleEvent(event: { Records: SQSRecord[] }) {
    try {
      for (const record of event.Records) {
        const payload = JSON.parse(record.body);

        this.logger.error('EventHandlerService.handleEvent', payload);

        const appointment = JSON.parse(payload['Message']) as Appointment;

        const { id } = await this.appointmentService.create([appointment]);

        return { id };
      }
    } catch (error) {
      this.logger.error('EventHandlerService', error.message);
    }
  }
}
