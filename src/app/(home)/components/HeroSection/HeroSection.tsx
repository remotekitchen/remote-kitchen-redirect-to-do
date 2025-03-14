'use client';
import { useState, useEffect } from 'react';
import { Loader2, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FilterModal from '../FilterModal/FilterModal';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
const FindLocation = dynamic(() => import('../FindLocation/FindLocation'), { ssr: false });

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export default function HeroSection({ loading, setLoading }: any) {
  const [searchState, setSearchState] = useState({
    food: '',
    address: '',
    coordinates: null,
    error: null,
    isLoading: false,
  });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Load the search value from the URL on component mount
  useEffect(() => {
    const initialFood = searchParams.get('search') || '';
    setSearchState((prev) => ({ ...prev, food: initialFood }));
  }, [searchParams]);

  const handleInputChange = (type: 'food' | 'address', value: string) => {
    setSearchState((prev) => ({ ...prev, [type]: value, error: null }));

    // Update URL with search query
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set('search', value);
    } else {
      newSearchParams.delete('search');
    }

    router.replace(`?${newSearchParams.toString()}`, { scroll: false });
  };

  return (
    <div className=" md:!p-24 p-4 ">
      <div className="container mx-auto text-center">
        <div className="md:w-[800px] mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 md:text-5xl">
            Delicious Food, Delivered to Your Doorstep
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Find your favorite meals and get them delivered to your location in
            minutes.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:gap-2">
          <div className="grid md:grid-cols-2 grid-cols-1 items-center">
            <div>
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 transform text-gray-400" />
                <Input
                  type="text"
                  placeholder="What are you craving today?"
                  value={searchState.food}
                  onChange={(e) => handleInputChange('food', e.target.value)}
                  className="h-[55px] w-full rounded-full border-2 border-purple-300 px-6 py-2 pl-12 text-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <FindLocation
              setLoading={setLoading}
              loading={loading}
            />
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:justify-center">
            <Button
              type="button"
              className="flex w-full items-center gap-2 rounded-full bg-gray-100 px-6 py-4 font-medium text-primary hover:bg-gray-200 md:w-auto"
              onClick={() => setShowFilterModal(true)}
            >
              <Filter className="h-5 w-5" /> Filters
            </Button>
          </div>
        </div>

        {searchState.error && (
          <p className="mt-4 text-sm text-red-500">{searchState.error}</p>
        )}

        <FilterModal
          setShowFilterModal={setShowFilterModal}
          showFilterModal={showFilterModal}
        />
      </div>
    </div>
  );
}
