import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/infraestructure/common/base.service';
import { errorCodes } from 'src/infraestructure/config/error-messages';
import { CustomException } from 'src/infraestructure/exceptions/custom-exception';
import { Repository } from 'typeorm/repository/Repository';
import { CreateAppointmentDto } from './dto/create.appointment.dto';
import { Appointment } from 'src/domain/appointment.entity';
import { CreatedAppointmentDto } from './dto/created.appointment.dto';

@Injectable()
export class AppointmentService extends BaseService<Appointment> {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {
    super(appointmentRepository);
  }

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<CreatedAppointmentDto> {
    const createdRecord =
      this.appointmentRepository.create(createAppointmentDto);
    const { id } = await this.appointmentRepository.save(createdRecord);
    this.logger.log(`${this.getNamespace()}.create`, {
      id,
    });
    return { id };
  }
}
