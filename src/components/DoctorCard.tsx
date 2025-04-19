
import { Doctor } from "@/types/doctor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock } from "lucide-react";

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctor: Doctor) => void;
}

const DoctorCard = ({ doctor, onBookAppointment }: DoctorCardProps) => {
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Morning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Afternoon':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Evening':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={doctor.photo}
            alt={`${doctor.name}`}
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h3 className="text-white text-xl font-semibold">{doctor.name}</h3>
            <Badge className="bg-medical-600 hover:bg-medical-700">{doctor.specialty}</Badge>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center">
            <MapPin size={16} className="text-gray-500 mr-1" />
            <span className="text-sm text-gray-600">{doctor.location}</span>
          </div>
          <div className="flex items-center">
            <Star size={16} className="text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{doctor.rating}/5.0</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Clock size={16} className="text-gray-500 mr-1" />
            {doctor.availability.map((time) => (
              <span
                key={time}
                className={`text-xs px-2 py-1 rounded-full border ${getAvailabilityColor(time)}`}
              >
                {time}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => onBookAppointment(doctor)} 
          className="w-full bg-medical-600 hover:bg-medical-700"
          aria-label={`Book appointment with ${doctor.name}`}
        >
          Book Appointment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
