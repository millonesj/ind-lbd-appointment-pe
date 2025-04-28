// src/main.ts
import { NestFactory } from '@nestjs/core';
import { SqsModule } from './infraestructure/common/sqs/sqs.module';
import { SqsConsumerHandler } from './infraestructure/common/sqs/appointment.handler';

let cachedHandler: any;

export const handler = async (event: any, context: any) => {
  if (!cachedHandler) {
    const app = await NestFactory.createApplicationContext(SqsModule);
    const sqsConsumerHandler = app.get(SqsConsumerHandler);
    cachedHandler = sqsConsumerHandler.handler;
  }
  console.log('Handler is processing the event...');
  return cachedHandler(event, context);
};
