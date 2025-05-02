import { Injectable, Logger } from '@nestjs/common';
import {
  EventBridgeClient,
  PutEventsCommand,
} from '@aws-sdk/client-eventbridge';
import { AppointmentConfirmationI } from './appointment-confirmation.interface';

@Injectable()
export class EventBridgeService {
  private readonly eventBridge: EventBridgeClient;
  private readonly eventBusName = 'AppointmentEventBus';

  constructor(private readonly logger: Logger) {
    this.eventBridge = new EventBridgeClient({
      region: 'us-east-1',
    });
  }

  async publishEvent(
    appointmentConfirmation: AppointmentConfirmationI,
  ): Promise<void> {
    const params = {
      Entries: [
        {
          EventBusName: process.env.EVENT_BUS_NAME,
          Source: 'appointment_pe.service',
          DetailType: 'AppointmentConfirmationPE',
          Detail: JSON.stringify({
            appointmentConfirmation,
          }),
        },
      ],
    };

    try {
      const command = new PutEventsCommand(params);
      const result = await this.eventBridge.send(command);

      if (result.FailedEntryCount && result.FailedEntryCount > 0) {
        this.logger.log('Error publishing event:', result.Entries);
        throw new Error('Failed to publish event to EventBridge');
      }

      console.log('Event published successfully:', result);
    } catch (error) {
      this.logger.error('Error publishing to EventBridge:', error);
      throw error;
    }
  }
}
