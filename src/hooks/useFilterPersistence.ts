import { useEffect } from 'react';

interface FilterState {
  searchQuery: string;
  selectedCity: string;
  selectedSpecialties: string[];
  priceRange: number[];
  minRating: number;
  availableToday: boolean;
  verifiedOnly: boolean;
  sortBy: string;
  selectedLanguages: string[];
  experienceRange: number[];
  availableWeekend: boolean;
  homeVisits: boolean;
  onlineConsultation: boolean;
  maxDistance: number;
  genderPreference: string;
  ageRange: number[];
  newTherapists: boolean;
}

const STORAGE_KEY = 'numassage-filters';

export const useFilterPersistence = (
  filters: FilterState,
  setters: {
    setSearchQuery: (value: string) => void;
    setSelectedCity: (value: string) => void;
    setSelectedSpecialties: (value: string[]) => void;
    setPriceRange: (value: number[]) => void;
    setMinRating: (value: number) => void;
    setAvailableToday: (value: boolean) => void;
    setVerifiedOnly: (value: boolean) => void;
    setSortBy: (value: string) => void;
    setSelectedLanguages: (value: string[]) => void;
    setExperienceRange: (value: number[]) => void;
    setAvailableWeekend: (value: boolean) => void;
    setHomeVisits: (value: boolean) => void;
    setOnlineConsultation: (value: boolean) => void;
    setMaxDistance: (value: number) => void;
    setGenderPreference: (value: string) => void;
    setAgeRange: (value: number[]) => void;
    setNewTherapists: (value: boolean) => void;
  }
) => {
  // Load filters from localStorage on component mount
  useEffect(() => {
    try {
      const savedFilters = localStorage.getItem(STORAGE_KEY);
      if (savedFilters) {
        const parsedFilters = JSON.parse(savedFilters);
        
        // Only restore non-default values
        if (parsedFilters.searchQuery) setters.setSearchQuery(parsedFilters.searchQuery);
        if (parsedFilters.selectedCity && parsedFilters.selectedCity !== 'all') setters.setSelectedCity(parsedFilters.selectedCity);
        if (parsedFilters.selectedSpecialties?.length > 0) setters.setSelectedSpecialties(parsedFilters.selectedSpecialties);
        if (parsedFilters.priceRange && (parsedFilters.priceRange[0] !== 50 || parsedFilters.priceRange[1] !== 250)) {
          setters.setPriceRange(parsedFilters.priceRange);
        }
        if (parsedFilters.minRating > 0) setters.setMinRating(parsedFilters.minRating);
        if (parsedFilters.availableToday) setters.setAvailableToday(parsedFilters.availableToday);
        if (parsedFilters.verifiedOnly) setters.setVerifiedOnly(parsedFilters.verifiedOnly);
        if (parsedFilters.sortBy && parsedFilters.sortBy !== 'rating') setters.setSortBy(parsedFilters.sortBy);
        if (parsedFilters.selectedLanguages?.length > 0) setters.setSelectedLanguages(parsedFilters.selectedLanguages);
        if (parsedFilters.experienceRange && (parsedFilters.experienceRange[0] !== 0 || parsedFilters.experienceRange[1] !== 20)) {
          setters.setExperienceRange(parsedFilters.experienceRange);
        }
        if (parsedFilters.availableWeekend) setters.setAvailableWeekend(parsedFilters.availableWeekend);
        if (parsedFilters.homeVisits) setters.setHomeVisits(parsedFilters.homeVisits);
        if (parsedFilters.onlineConsultation) setters.setOnlineConsultation(parsedFilters.onlineConsultation);
        if (parsedFilters.maxDistance !== 50) setters.setMaxDistance(parsedFilters.maxDistance);
        if (parsedFilters.genderPreference && parsedFilters.genderPreference !== 'any') {
          setters.setGenderPreference(parsedFilters.genderPreference);
        }
        if (parsedFilters.ageRange && (parsedFilters.ageRange[0] !== 20 || parsedFilters.ageRange[1] !== 65)) {
          setters.setAgeRange(parsedFilters.ageRange);
        }
        if (parsedFilters.newTherapists) setters.setNewTherapists(parsedFilters.newTherapists);
      }
    } catch (error) {
      console.warn('Failed to load saved filters:', error);
    }
  }, []); // Only run on mount

  // Save filters to localStorage whenever they change (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
      } catch (error) {
        console.warn('Failed to save filters:', error);
      }
    }, 500); // Debounce saves by 500ms

    return () => clearTimeout(timeoutId);
  }, [filters]);

  // Function to clear saved filters
  const clearSavedFilters = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear saved filters:', error);
    }
  };

  return { clearSavedFilters };
};
