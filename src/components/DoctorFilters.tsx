
import { useState } from "react";
import { specialties } from "@/data/mockData";
import { Availability } from "@/types/doctor";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DoctorFiltersProps {
  onSpecialtyChange: (specialty: string) => void;
  onAvailabilityChange: (availability: Availability | 'All') => void;
  selectedSpecialty: string;
  selectedAvailability: Availability | 'All';
}

const DoctorFilters = ({ 
  onSpecialtyChange, 
  onAvailabilityChange,
  selectedSpecialty,
  selectedAvailability
}: DoctorFiltersProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 space-y-4">
      <h2 className="text-lg font-semibold mb-2">Filters</h2>
      
      <div className="space-y-4 md:flex md:gap-4 md:items-center md:space-y-0">
        {/* Specialty Filter */}
        <div className="w-full md:w-1/2">
          <label htmlFor="specialty-select" className="block text-sm font-medium text-gray-700 mb-1">
            Specialty
          </label>
          <Select
            value={selectedSpecialty}
            onValueChange={onSpecialtyChange}
          >
            <SelectTrigger id="specialty-select" className="w-full" aria-label="Filter by specialty">
              <SelectValue placeholder="Select specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Availability Filter */}
        <div className="w-full md:w-1/2">
          <label id="availability-label" className="block text-sm font-medium text-gray-700 mb-1">
            Availability
          </label>
          <Tabs 
            defaultValue={selectedAvailability} 
            value={selectedAvailability} 
            onValueChange={(value) => onAvailabilityChange(value as Availability | 'All')}
            className="w-full"
            aria-labelledby="availability-label"
          >
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="Morning">Morning</TabsTrigger>
              <TabsTrigger value="Afternoon">Afternoon</TabsTrigger>
              <TabsTrigger value="Evening">Evening</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DoctorFilters;
