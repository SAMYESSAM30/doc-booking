
import { useState, useEffect, useRef } from "react";
import { Calendar } from "lucide-react";
import { Doctor } from "@/types/doctor";
import { generateMockTimeSlots } from "@/data/mockData";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useAppointmentStore } from "@/store/appointmentStore";
import { useToast } from "@/components/ui/use-toast";

interface BookingModalProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ doctor, isOpen, onClose }: BookingModalProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [formattedDate, setFormattedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const timeSlots = generateMockTimeSlots(formattedDate);
  const { addAppointment } = useAppointmentStore();
  const { toast } = useToast();
  const firstAvailableTimeSlotRef = useRef<HTMLButtonElement>(null);
  const lastFocusableElementRef = useRef<HTMLButtonElement>(null);

  // Handle date change
  useEffect(() => {
    if (date) {
      setFormattedDate(format(date, "yyyy-MM-dd"));
      setSelectedTimeSlot(null);
    }
  }, [date]);

  // Focus management for accessibility
  useEffect(() => {
    if (isOpen) {
      // Set timeout to wait for the dialog to be fully open
      const timeoutId = setTimeout(() => {
        firstAvailableTimeSlotRef.current?.focus();
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, timeSlots]);

  const handleConfirmBooking = () => {
    if (doctor && selectedTimeSlot) {
      addAppointment({
        doctorId: doctor.id,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        date: formattedDate,
        time: selectedTimeSlot,
        location: doctor.location,
      });

      toast({
        title: "Appointment Booked!",
        description: `Your appointment with ${doctor.name} on ${format(date, "MMMM d, yyyy")} at ${selectedTimeSlot} has been confirmed.`,
        duration: 5000,
      });
      
      onClose();
    }
  };

  // Handle keyboard navigation trap
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
    
    // Trap focus in modal
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstAvailableTimeSlotRef.current) {
        e.preventDefault();
        lastFocusableElementRef.current?.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusableElementRef.current) {
        e.preventDefault();
        firstAvailableTimeSlotRef.current?.focus();
      }
    }
  };

  if (!doctor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto" onKeyDown={handleKeyDown}>
        <DialogHeader>
          <DialogTitle className="text-xl">Book an Appointment with {doctor.name}</DialogTitle>
          <DialogDescription>
            {doctor.specialty} - {doctor.location}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Calendar size={16} /> Select Date
            </h3>
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={(newDate) => setDate(newDate || new Date())}
              className="rounded-md border mx-auto"
              disabled={(date) => {
                // Disable past dates and weekends
                return (
                  date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                  date.getDay() === 0 || // Sunday
                  date.getDay() === 6    // Saturday
                );
              }}
              aria-label="Appointment date"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Available Time Slots</h3>
            <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Available time slots">
              {timeSlots.map((slot, index) => (
                <Button
                  key={slot.id}
                  onClick={() => setSelectedTimeSlot(slot.time)}
                  disabled={!slot.isAvailable}
                  variant={selectedTimeSlot === slot.time ? "default" : "outline"}
                  className={`${
                    selectedTimeSlot === slot.time ? "bg-medical-600 hover:bg-medical-700" : ""
                  } ${!slot.isAvailable ? "line-through" : ""}`}
                  ref={index === 0 && slot.isAvailable ? firstAvailableTimeSlotRef : undefined}
                  role="radio"
                  aria-checked={selectedTimeSlot === slot.time}
                >
                  {slot.time}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-between gap-2">
          <Button 
            variant="outline" 
            onClick={onClose}
            ref={lastFocusableElementRef}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmBooking}
            disabled={!selectedTimeSlot}
            className="bg-medical-600 hover:bg-medical-700"
          >
            Confirm Appointment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
