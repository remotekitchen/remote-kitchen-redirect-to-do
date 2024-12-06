'use client';
import { useCallback, useState } from 'react';
import { Loader2, Search, MapPin, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FilterModal from '../FilterModal/FilterModal';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export default function HeroSection() {
  const [searchState, setSearchState] = useState({
    food: '',
    address: '',
    coordinates: null,
    error: null,
    isLoading: false,
  });
  const [showFilterModal, setShowFilterModal] = useState(false);

  const handleInputChange = useCallback(
    (type: 'food' | 'address', value: string) => {
      setSearchState((prev) => ({ ...prev, [type]: value, error: null }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!searchState.food || !searchState.address) {
        setSearchState((prev: any) => ({
          ...prev,
          error: 'Please enter both food preference and delivery address.',
        }));
        return;
      }

      setSearchState((prev) => ({ ...prev, isLoading: true }));

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log('Searching for:', {
          food: searchState.food,
          address: searchState.address,
          coordinates: searchState.coordinates,
        });
      } catch {
        setSearchState((prev: any) => ({
          ...prev,
          error: 'Failed to search for restaurants. Please try again.',
        }));
      } finally {
        setSearchState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [searchState],
  );

  return (
    <div className=" md:!p-24 p-4 ">
      <div className="container mx-auto text-center">
        <div className='md:w-[800px] mx-auto'>
          <h1 className="text-4xl font-bold text-gray-800 md:text-5xl">
            Delicious Food, Delivered to Your Doorstep
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Find your favorite meals and get them delivered to your location in
            minutes.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-6 md:gap-8"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 transform text-gray-400" />
              <Input
                type="text"
                placeholder="What are you craving today?"
                value={searchState.food}
                onChange={(e) => handleInputChange('food', e.target.value)}
                className="rounded-full py-6 pl-12 pr-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 transform text-gray-400" />
              <Input
                id="address-input"
                type="text"
                placeholder="Enter your delivery address"
                value={searchState.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="rounded-full py-6 pl-12 pr-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-100 p-2 hover:bg-gray-200 focus:outline-none focus:ring-primary"
                onClick={() => {
                  console.log('Locate me clicked');
                }}
              >
                <img src="/locate_me.svg" alt="" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:justify-center">
            <Button
              type="submit"
              className="!bg-[#1f2937] w-full rounded-full bg-primary px-6 py-4 font-medium text-white md:w-auto"
            >
              {searchState.isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Find Food'
              )}
            </Button>
            <Button
              type="button"
              className="flex w-full items-center gap-2 rounded-full bg-gray-100 px-6 py-4 font-medium text-primary hover:bg-gray-200 md:w-auto"
              onClick={() => setShowFilterModal(true)}
            >
              <Filter className="h-5 w-5" /> Filters
            </Button>
          </div>
        </form>

        {searchState.error && (
          <p className="mt-4 text-sm text-red-500">{searchState.error}</p>
        )}

        <FilterModal
          setShowModal={setShowFilterModal}
          showModal={showFilterModal}
        />
      </div>
    </div>
  );
}