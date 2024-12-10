'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function FilterModal({ showModal, setShowModal }: any) {
    // const [showModal, setShowModal] = useState(false);
    const [filters, setFilters] = useState<any>({
        tags: [],
        sortBy: '',
        distance: '',
    });

    const tagsList = ['Spicy', 'Goat', 'Chicken', '蜜雪冰城', '炸鸡'];
    const sortingOptions = [
        'Comprehensive Ranking',
        'Fastest Delivery',
        'Lowest Delivery Fee',
        'Most Rated',
        'Nearest',
    ];
    const distanceOptions = [
        '30min',
        '40min',
        '50min',
        '60min',
        '3 km',
        '7 km',
        '10 km',
        '20 km',
    ];


    const toggleOffer = (offer: string) => {
        setFilters((prev: any) => ({
            ...prev,
            offers: prev.offers.includes(offer)
                ? prev.offers.filter((item: any) => item !== offer)
                : [...prev.offers, offer],
        }));
    };

    const toggleCuisine = (cuisine: string) => {
        setFilters((prev: any) => ({
            ...prev,
            cuisines: prev.cuisines.includes(cuisine)
                ? prev.cuisines.filter((item: any) => item !== cuisine)
                : [...prev.cuisines, cuisine],
        }));
    };

    const toggleTag = (tag: string) => {
        setFilters((prev: any) => ({
            ...prev,
            tags: prev.tags.includes(tag)
                ? prev.tags.filter((item: any) => item !== tag)
                : [...prev.tags, tag],
        }));
    };

    const selectSortingOption = (option: string) => {
        setFilters((prev: any) => ({ ...prev, sortBy: option }));
    };

    const selectDistance = (distance: string) => {
        setFilters((prev: any) => ({ ...prev, distance }));
    };

    const handlePriceRange = (range: string) => {
        setFilters((prev: any) => ({ ...prev, priceRange: range }));
    };

    const handleClearFilters = () => {
        setFilters({
            tags: [],
            sortBy: '',
            distance: '',
        });
    };

    return (
        <div>
            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-left"
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-11/12 max-w-lg rounded-lg bg-white p-6 shadow-lg"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-xl font-bold">Filters</h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Tags */}
                            <div className="mb-6">
                                <h3 className="mb-2 text-sm font-semibold">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {tagsList.map((tag: any) => (
                                        <button
                                            key={tag}
                                            onClick={() => toggleTag(tag)}
                                            className={`rounded-full border px-3 py-1 ${filters.tags.includes(tag)
                                                ? 'border-primary bg-primary text-white'
                                                : 'border-gray-300 text-gray-600'
                                                }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sorting Options */}
                            <div className="mb-6">
                                <h3 className="mb-2 text-sm font-semibold">Sorting Options</h3>
                                <div className="flex flex-wrap gap-2">
                                    {sortingOptions.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => selectSortingOption(option)}
                                            className={`rounded-full border px-3 py-1 ${filters.sortBy === option
                                                ? 'border-yellow-400 bg-yellow-400 text-black'
                                                : 'border-gray-300 text-gray-600'
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Distance */}
                            <div className="mb-6">
                                <h3 className="mb-2 text-sm font-semibold">Distance</h3>
                                <div className="flex flex-wrap gap-2">
                                    {distanceOptions.map((distance) => (
                                        <button
                                            key={distance}
                                            onClick={() => selectDistance(distance)}
                                            className={`rounded-full border px-3 py-1 ${filters.distance === distance
                                                ? 'border-yellow-400 bg-yellow-400 text-black'
                                                : 'border-gray-300 text-gray-600'
                                                }`}
                                        >
                                            {distance}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-6 flex items-center justify-between">
                                <Button
                                    variant="ghost"
                                    onClick={handleClearFilters}
                                    className="text-gray-600 hover:bg-gray-100"
                                >
                                    Clear all
                                </Button>
                                <Button
                                    className="hover:bg-primary-dark bg-primary font-medium text-white"
                                    onClick={() => {
                                        console.log('Applied Filters:', filters);
                                        setShowModal(false);
                                    }}
                                >
                                    Apply
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}