export interface AppointmentConfirmationI {
  id: string;
  status: StatusAppointmentConfirmationI;
}

export type StatusAppointmentConfirmationI = 'completed';
