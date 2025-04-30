import { NestFactory } from '@nestjs/core';
import { SqsModule } from './infraestructure/common/sqs/sqs.module';
import { Logger } from '@nestjs/common';

let cachedHandler: any;
const logger = new Logger('AppointmentLambdaHandler');

export const handler = async (event: any, context: any) => {
  if (!cachedHandler) {
    const app = await NestFactory.createApplicationContext(SqsModule);
    const sqsConsumerHandler = app.get(handler);
    cachedHandler = sqsConsumerHandler.handler;
  }
  logger.log('Handler is processing the event...');

  return cachedHandler(event, context);
};
