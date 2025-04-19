
export type Availability = 'Morning' | 'Afternoon' | 'Evening';

export interface Doctor {
  id: string;
  name: string;
  photo: string;
  specialty: string;
  availability: Availability[];
  location: string;
  rating: number;
}

export interface TimeSlot {
  id: string;
  time: string;
  isAvailable: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
}
