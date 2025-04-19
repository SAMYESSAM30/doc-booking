
import { useState, useMemo } from "react";
import { Doctor, Availability } from "@/types/doctor";
import { mockDoctors } from "@/data/mockData";
import DoctorCard from "./DoctorCard";
import DoctorFilters from "./DoctorFilters";
import BookingModal from "./BookingModal";

const DoctorDirectory = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState<Availability | 'All'>('All');

  const filteredDoctors = useMemo(() => {
    return mockDoctors.filter((doctor) => {
      const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty;
      const matchesAvailability = selectedAvailability === 'All' || doctor.availability.includes(selectedAvailability);
      return matchesSpecialty && matchesAvailability;
    });
  }, [selectedSpecialty, selectedAvailability, mockDoctors]);

  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <div>
      <DoctorFilters
        selectedSpecialty={selectedSpecialty}
        selectedAvailability={selectedAvailability}
        onSpecialtyChange={setSelectedSpecialty}
        onAvailabilityChange={setSelectedAvailability}
      />

      {filteredDoctors.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-700">No doctors match your filters</h3>
          <p className="text-gray-500">Try adjusting your filters to find more doctors</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBookAppointment={handleBookAppointment}
            />
          ))}
        </div>
      )}

      <BookingModal
        doctor={selectedDoctor}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default DoctorDirectory;
