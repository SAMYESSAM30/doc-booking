
import { useMemo } from "react";
import { useAppointmentStore } from "@/store/appointmentStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, X } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const AppointmentList = () => {
  const { appointments, cancelAppointment } = useAppointmentStore();
  const { toast } = useToast();
  
  const sortedAppointments = useMemo(() => {
    return [...appointments].sort((a, b) => {
      // Sort by date first
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });
  }, [appointments]);

  const handleCancelAppointment = (id: string, doctorName: string) => {
    cancelAppointment(id);
    toast({
      title: "Appointment Cancelled",
      description: `Your appointment with ${doctorName} has been cancelled.`,
      variant: "destructive",
      duration: 3000,
    });
  };

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-500 mb-2">No Appointments Yet</h2>
        <p className="text-gray-400">Book an appointment with a doctor to see it here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Your Upcoming Appointments</h2>
      
      {sortedAppointments.map((appointment) => {
        const appointmentDate = new Date(appointment.date);
        const formattedDate = format(appointmentDate, "EEEE, MMMM d, yyyy");
        
        return (
          <Card key={appointment.id} className="relative">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold">{appointment.doctorName}</h3>
                    <Badge variant="outline">{appointment.specialty}</Badge>
                  </div>
                  
                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formattedDate}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{appointment.time}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{appointment.location}</span>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                    onClick={() => handleCancelAppointment(appointment.id, appointment.doctorName)}
                    aria-label={`Cancel appointment with ${appointment.doctorName}`}
                  >
                    <X className="h-4 w-4 mr-1" /> Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AppointmentList;
