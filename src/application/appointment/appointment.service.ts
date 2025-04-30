import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/infraestructure/common/base.service';
import { Appointment } from 'src/domain/appointment.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class AppointmentService extends BaseService<Appointment> {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {
    super(appointmentRepository);
  }

  async create(createAppointment: Appointment[]) {
    try {
      const responseAppointment = await this.appointmentRepository.save(
        createAppointment,
      );

      const autoId = responseAppointment?.[0]?.autoId;
      this.logger.error('AppointmentService.create', autoId);
      return { autoId };
    } catch (error) {
      this.logger.error('AppointmentService.create', error.message);
    }
  }
}
