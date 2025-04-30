import { Logger, Module, OnApplicationShutdown } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from 'src/domain/appointment.entity';
import { AppointmentService } from 'src/application/appointment/appointment.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/infraestructure/config/configuration';
import { typeOrmConfig } from 'src/infraestructure/config/type-orm-config';
import { DataSource } from 'typeorm';
import { EventHandlerService } from './event-handler.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      name: 'default',
      imports: [ConfigModule],
      useFactory: async () => {
        const logger = new Logger('TypeORM');
        logger.log('🔌 Inicializando conexión TypeORM');
        return typeOrmConfig;
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Appointment]),
  ],
  providers: [EventHandlerService, AppointmentService, Logger],
})
export class SqsModule implements OnApplicationShutdown {
  private readonly logger = new Logger(SqsModule.name);

  constructor(private readonly dataSource: DataSource) {}

  async onApplicationShutdown(_signal?: string) {
    if (this.dataSource.isInitialized) {
      await this.dataSource.destroy();
      this.logger.log('Database connection closed');
    }
  }
}
