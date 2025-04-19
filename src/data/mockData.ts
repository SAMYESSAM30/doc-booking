
import { Doctor, TimeSlot, Availability } from '../types/doctor';

export const specialties = [
  'All',
  'Cardiology',
  'Dermatology',
  'Family Medicine',
  'Neurology',
  'Obstetrics',
  'Ophthalmology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry',
  'Urology'
];

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    specialty: 'Cardiology',
    availability: ['Morning', 'Afternoon'],
    location: 'Downtown Medical Center',
    rating: 4.8
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    specialty: 'Dermatology',
    availability: ['Afternoon', 'Evening'],
    location: 'Westside Clinic',
    rating: 4.6
  },
  {
    id: '3',
    name: 'Dr. Olivia Martinez',
    photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    specialty: 'Pediatrics',
    availability: ['Morning', 'Evening'],
    location: 'Children\'s Hospital',
    rating: 4.9
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    specialty: 'Orthopedics',
    availability: ['Morning', 'Afternoon'],
    location: 'Sports Medicine Center',
    rating: 4.7
  },
  {
    id: '5',
    name: 'Dr. Amelia Patel',
    photo: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    specialty: 'Neurology',
    availability: ['Afternoon', 'Evening'],
    location: 'Neuroscience Institute',
    rating: 4.8
  },
  {
    id: '6',
    name: 'Dr. Robert Kim',
    photo: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    specialty: 'Family Medicine',
    availability: ['Morning', 'Afternoon', 'Evening'],
    location: 'Community Health Center',
    rating: 4.5
  },
  {
    id: '7',
    name: 'Dr. Emily Rodriguez',
    photo: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    specialty: 'Psychiatry',
    availability: ['Afternoon', 'Evening'],
    location: 'Behavioral Health Clinic',
    rating: 4.9
  },
  {
    id: '8',
    name: 'Dr. Daniel Thompson',
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    specialty: 'Ophthalmology',
    availability: ['Morning', 'Afternoon'],
    location: 'Vision Care Center',
    rating: 4.7
  }
];

export const generateMockTimeSlots = (date: string): TimeSlot[] => {
  // Generate time slots for a specific date
  return [
    { id: '1', time: '9:00 AM', isAvailable: true },
    { id: '2', time: '9:30 AM', isAvailable: true },
    { id: '3', time: '10:00 AM', isAvailable: true },
    { id: '4', time: '10:30 AM', isAvailable: false },
    { id: '5', time: '11:00 AM', isAvailable: true },
    { id: '6', time: '11:30 AM', isAvailable: true },
    { id: '7', time: '1:00 PM', isAvailable: true },
    { id: '8', time: '1:30 PM', isAvailable: false },
    { id: '9', time: '2:00 PM', isAvailable: true },
    { id: '10', time: '2:30 PM', isAvailable: true },
    { id: '11', time: '3:00 PM', isAvailable: true },
    { id: '12', time: '3:30 PM', isAvailable: false },
    { id: '13', time: '4:00 PM', isAvailable: true },
    { id: '14', time: '4:30 PM', isAvailable: true },
    { id: '15', time: '5:00 PM', isAvailable: true },
  ];
};
