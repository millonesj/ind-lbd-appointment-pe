import { Injectable, Logger } from '@nestjs/common';
import { SQSHandler, SQSEvent } from 'aws-lambda';
import { AppointmentService } from 'src/application/appointment/appointment.service';

@Injectable()
export class SqsConsumerHandler {
  private readonly logger = new Logger(SqsConsumerHandler.name);

  constructor(private readonly appointmentService: AppointmentService) {}

  public handler: SQSHandler = async (event: SQSEvent): Promise<void> => {
    for (const record of event.Records) {
      try {
        const data = JSON.parse(record.body);
        this.logger.log(`Processing appointment with ID: ${data.id}`);
        await this.appointmentService.create(data);
        this.logger.log(
          `Successfully processed appointment with ID: ${data.id}`,
        );
      } catch (error) {
        this.logger.error('Error processing appointment:', error);
        // Manejo de errores, por ejemplo, enviar a una DLQ o registrar el error
      }
    }
  };
}
