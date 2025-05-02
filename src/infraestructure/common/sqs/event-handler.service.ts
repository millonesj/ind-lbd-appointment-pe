import { Injectable, Logger } from '@nestjs/common';
import { Appointment } from 'src/domain/appointment.entity';
import { SQSRecord } from 'aws-lambda';
import { AppointmentService } from 'src/application/appointment/appointment.service';
import { EventBridgeService } from '../bus/event-bridge.service';

@Injectable()
export class EventHandlerService {
  constructor(
    private readonly logger: Logger,
    private readonly appointmentService: AppointmentService,
    private readonly eventBridgeService: EventBridgeService,
  ) {}

  async handleEvent(event: { Records: SQSRecord[] }) {
    try {
      for (const record of event.Records) {
        const payload = JSON.parse(record.body);

        this.logger.log('EventHandlerService.handleEvent', payload);

        const appointment = JSON.parse(payload['Message']) as Appointment;

        const { id } = await this.appointmentService.create([appointment]);
        if (id) {
          await this.eventBridgeService.publishEvent({
            id,
            status: 'completed',
          });
        }
        return { id };
      }
    } catch (error) {
      this.logger.error('EventHandlerService', error.message);
    }
  }
}
