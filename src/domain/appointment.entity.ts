import { BaseEntity } from 'src/infraestructure/common/base.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'appointment',
})
export class Appointment extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar' })
  insuredId: string;

  @Column({ type: 'int' })
  scheduleId: number;
}
