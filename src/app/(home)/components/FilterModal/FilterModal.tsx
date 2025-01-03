'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterModalProps {
    setShowFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
    showFilterModal: boolean;
}

export default function FilterModal({
    setShowFilterModal,
    showFilterModal,
}: FilterModalProps) {
    const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 1000]);
    const [selectedSorting, setSelectedSorting] = React.useState<string[]>([]);
    const [selectedTimeDistance, setSelectedTimeDistance] = React.useState<string | null>(
        null,
    );
    const [selectedKmDistance, setSelectedKmDistance] = React.useState<string | null>(
        null,
    );
    const [searchInput, setSearchInput] = React.useState('');
    const [cuisine, setCuisine] = React.useState<string | null>(null);
    const [isPriceChanged, setIsPriceChanged] = React.useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const filterRef = React.useRef<HTMLDivElement>(null);

    const sortingOptionsMap: { [key: string]: string } = {
        'Comprehensive Ranking': 'comprehensive_ranking',
        'Fastest Delivery': 'fastest_delivery',
        'Lowest Delivery Fee': 'ldf',
        'Most Rated': 'most_rated',
        Nearest: 'nearest',
    };

    const timeDistances = ['30min', '40min', '50min', '60min'];
    const kmDistances = ['3 km', '7 km', '10 km', '20 km'];

    // Initialize states based on URL parameters
    React.useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        const priceGte = params.get('price_gte');
        const priceLte = params.get('price_lte');
        const timeDistance = params.get('time_distance');
        const kmDistance = params.get('km');
        const search = params.get('search');
        const cuisineParam = params.get('cuisine');

        // Initialize sorting options
        const activeSorting = Object.keys(sortingOptionsMap).filter((option) =>
            params.has(sortingOptionsMap[option]),
        );

        if (priceGte && priceLte) {
            setPriceRange([parseInt(priceGte, 10), parseInt(priceLte, 10)]);
            setIsPriceChanged(true);
        } else {
            setPriceRange([0, 1000]);
            setIsPriceChanged(false);
        }

        setSelectedSorting(activeSorting);
        setSelectedTimeDistance(timeDistance ? `${timeDistance}min` : null);
        setSelectedKmDistance(kmDistance ? `${kmDistance} km` : null);
        setSearchInput(search || '');
        setCuisine(cuisineParam || null);
    }, [searchParams]);

    const toggleTimeDistance = (distance: string) => {
        setSelectedTimeDistance(selectedTimeDistance === distance ? null : distance);
    };

    const toggleKmDistance = (distance: string) => {
        setSelectedKmDistance(selectedKmDistance === distance ? null : distance);
    };

    const updateURLQuery = (params: Record<string, string | undefined>) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        Object.entries(params).forEach(([key, value]) => {
            if (value === undefined) {
                currentParams.delete(key);
            } else {
                currentParams.set(key, value);
            }
        });
        router.push(`?${currentParams.toString()}`);
    };

    const applyFilters = () => {
        const params: Record<string, string | undefined> = {};

        if (isPriceChanged) {
            params.price_gte = priceRange[0].toString();
            params.price_lte = priceRange[1].toString();
        } else {
            params.price_gte = undefined;
            params.price_lte = undefined;
        }

        Object.entries(sortingOptionsMap).forEach(([label, key]) => {
            params[key] = selectedSorting.includes(label) ? 'true' : undefined;
        });

        if (selectedTimeDistance) {
            // Remove "min" from the time distance value
            params.time_distance = selectedTimeDistance.replace('min', '').trim();
        } else {
            params.time_distance = undefined;
        }

        if (selectedKmDistance) {
            // Remove "km" from the km distance value
            params.km = selectedKmDistance.replace('km', '').trim();
        } else {
            params.km = undefined;
        }

        if (searchInput) {
            params.search = searchInput;
        } else {
            params.search = undefined;
        }

        if (cuisine) {
            params.cuisine = cuisine;
        } else {
            params.cuisine = undefined;
        }

        updateURLQuery(params);
        setShowFilterModal(false);
    };

    const clearFilters = () => {
        updateURLQuery({
            price_gte: undefined,
            price_lte: undefined,
            comprehensive_ranking: undefined,
            fastest_delivery: undefined,
            ldf: undefined,
            most_rated: undefined,
            nearest: undefined,
            time_distance: undefined,
            km: undefined,
            search: undefined,
            cuisine: undefined,
        });
        setPriceRange([0, 1000]);
        setIsPriceChanged(false);
        setSelectedSorting([]);
        setSelectedTimeDistance(null);
        setSelectedKmDistance(null);
        setSearchInput('');
        setCuisine(null);
        setShowFilterModal(false);
    };

    const handleSliderChange = (value: number | number[]) => {
        if (Array.isArray(value) && value.length === 2) {
            setPriceRange([value[0], value[1]]);
            setIsPriceChanged(true);
        }
    };

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setShowFilterModal(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setShowFilterModal]);

    return (
        <AnimatePresence>
            {showFilterModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-d8b4fe bg-opacity-80 backdrop-blur-sm">
                    <motion.div
                        ref={filterRef}
                        className="relative w-[90%] max-w-2xl rounded-lg bg-white p-6 shadow-2xl"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-purple-700">Filter Options</h2>
                            <button
                                onClick={() => setShowFilterModal(false)}
                                className="text-gray-500 hover:text-purple-700"
                            >
                                ✖
                            </button>
                        </div>

                        {/* Sorting Options */}
                        <div className="mb-6">
                            <h3 className="mb-2 text-lg font-medium text-gray-800">
                                Sorting Options
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {Object.keys(sortingOptionsMap).map((option) => (
                                    <Button
                                        key={option}
                                        variant="outline"
                                        onClick={() =>
                                            setSelectedSorting((prev) =>
                                                prev.includes(option)
                                                    ? prev.filter((item) => item !== option)
                                                    : [...prev, option],
                                            )
                                        }
                                        className={cn(
                                            'rounded-full border text-sm font-semibold',
                                            selectedSorting.includes(option)
                                                ? 'bg-purple-200 text-purple-800 border-purple-700'
                                                : 'bg-gray-100 text-gray-600 hover:bg-purple-100',
                                        )}
                                    >
                                        {option}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Time Distance */}
                        <div className="mb-6">
                            <h3 className="mb-2 text-lg font-medium text-gray-800">
                                Time Distance
                            </h3>
                            <div className="grid grid-cols-4 gap-3">
                                {timeDistances.map((distance) => (
                                    <span
                                        key={distance}
                                        onClick={() => toggleTimeDistance(distance)}
                                        className={`flex cursor-pointer items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-all ${selectedTimeDistance === distance
                                                ? 'bg-purple-200 text-purple-800 border border-purple-700'
                                                : 'bg-gray-100 text-gray-600 hover:bg-purple-100'
                                            }`}
                                    >
                                        {distance}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* KM Distance */}
                        <div className="mb-6">
                            <h3 className="mb-2 text-lg font-medium text-gray-800">
                                KM Distance
                            </h3>
                            <div className="grid grid-cols-4 gap-3">
                                {kmDistances.map((distance) => (
                                    <span
                                        key={distance}
                                        onClick={() => toggleKmDistance(distance)}
                                        className={`flex cursor-pointer items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-all ${selectedKmDistance === distance
                                                ? 'bg-purple-200 text-purple-800 border border-purple-700'
                                                : 'bg-gray-100 text-gray-600 hover:bg-purple-100'
                                            }`}
                                    >
                                        {distance}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Pricing Slider */}
                        <div className="mb-6">
                            <h3 className="mb-2 text-lg font-medium text-gray-800">Pricing</h3>
                            <Slider
                                range
                                min={0}
                                max={1000}
                                value={priceRange}
                                onChange={handleSliderChange}
                                handleStyle={{
                                    borderColor: '#D8B4FE',
                                    backgroundColor: '#D8B4FE',
                                }}
                                trackStyle={{
                                    backgroundColor: '#D8B4FE',
                                }}
                                railStyle={{
                                    backgroundColor: '#eaeaea',
                                }}
                            />
                            <div className="mt-3 flex justify-between text-sm text-gray-700">
                                <span>${priceRange[0]}</span>
                                <span>${priceRange[1]}</span>
                            </div>
                        </div>

                        {/* Search Input */}
                        {/*
                        <div className="mb-6">
                            <h3 className="mb-2 text-lg font-medium text-gray-800">Search</h3>
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="w-full rounded border px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Search..."
                            />
                        </div>
                        */}

                        {/* Cuisine Input */}
                        {/*
                        <div className="mb-6">
                            <h3 className="mb-2 text-lg font-medium text-gray-800">Cuisine</h3>
                            <input
                                type="text"
                                value={cuisine || ''}
                                onChange={(e) => setCuisine(e.target.value)}
                                className="w-full rounded border px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Cuisine..."
                            />
                        </div>
                        */}

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                className="flex-1 border-gray-400 text-gray-700 hover:bg-gray-200"
                                onClick={clearFilters}
                            >
                                Clear all
                            </Button>
                            <Button
                                className="flex-1 bg-purple-600 text-white hover:bg-purple-700"
                                onClick={applyFilters}
                            >
                                Apply Filter
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
