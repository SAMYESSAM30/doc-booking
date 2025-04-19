
import { create } from 'zustand';
import { Appointment } from '../types/doctor';
import { v4 as uuidv4 } from 'uuid';

interface AppointmentState {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  cancelAppointment: (id: string) => void;
}

export const useAppointmentStore = create<AppointmentState>((set) => ({
  appointments: [],
  addAppointment: (appointment) => 
    set((state) => ({
      appointments: [...state.appointments, { ...appointment, id: uuidv4() }]
    })),
  cancelAppointment: (id) => 
    set((state) => ({
      appointments: state.appointments.filter(appointment => appointment.id !== id)
    }))
}));
