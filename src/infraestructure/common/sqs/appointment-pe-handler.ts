import { Context, Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { SqsModule } from './sqs.module';
import { DataSource } from 'typeorm';
import { typeOrmConfig } from '../../config/type-orm-config';
import { Logger } from '@nestjs/common';
import { EventHandlerService } from './event-handler.service';

let cachedApp;
let dataSource: DataSource;
const logger = new Logger('AppointmentPeHandler');

async function initializeDataSource() {
  if (!dataSource?.isInitialized) {
    const config = typeOrmConfig;
    dataSource = new DataSource(config as any);
    await dataSource.initialize();
    logger.log('Database connection established');
  }
  return dataSource;
}

export const handler: Handler = async (event: any, context: Context) => {
  logger.debug(
    `Lambda invocation started with messageId: ${event?.Records?.[0]?.messageId}`,
  );
  try {
    await initializeDataSource();

    cachedApp ??= await NestFactory.createApplicationContext(SqsModule);

    const service = cachedApp.get(EventHandlerService);
    await service.handleEvent(event);
    logger.log('Event processed successfully');

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Processed' }),
    };
  } catch (error) {
    logger.error(`Error processing event: ${error.message}`);

    if (dataSource?.isInitialized) {
      await dataSource.destroy();
      dataSource = null;
    }
    cachedApp = null;
    throw error;
  }
};
