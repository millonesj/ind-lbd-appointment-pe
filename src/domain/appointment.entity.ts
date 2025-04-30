import { BaseEntity } from 'src/infraestructure/common/base.entity';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

export type AppointmentStatus = 'pending' | 'completed' | 'failed';

@Entity({
  name: 'appointment',
})
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  autoId: number;

  @Column({ type: 'varchar' })
  id: string;

  @Column({ type: 'varchar' })
  insuredId: string;

  @Column({ type: 'int' })
  scheduleId: number;

  @Column({ type: 'varchar' })
  countryISO: 'PE' | 'CL';

  @Column({ type: 'varchar', default: 'pending' })
  status: AppointmentStatus;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;
}
