"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Search, Loader2, X, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/app/redux/hooks/hooks';
import { setLocationData } from '@/app/redux/features/fetchLocation/fetchLocation';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

type Suggestion = {
    id: string;
    place_name: string;
};

export default function FindLocation() {
    const [address, setAddress] = useState<string>('');
    const [isLocating, setIsLocating] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isLocated, setIsLocated] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();
    const locateMeData = useAppSelector((state: any) => state.locateMe);

    useEffect(() => {
        if (locateMeData?.address) {
            setAddress(locateMeData.address);
        }
    }, [locateMeData?.address]);

    const fetchLocation = useCallback(() => {
        if (!navigator.geolocation) return;

        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`;

                try {
                    const response = await fetch(url);
                    const data = await response.json();

                    if (data?.features?.length > 0) {
                        const formattedAddress = data.features[0].place_name;
                        setAddress(formattedAddress);
                        setIsLocated(true);
                        dispatch(
                            setLocationData({
                                address: formattedAddress,
                                lat: latitude.toString(),
                                lng: longitude.toString(),
                            })
                        );
                    }
                } catch (error) {
                    console.error('Error fetching location:', error);
                } finally {
                    setIsLocating(false);
                }
            },
            (error) => {
                console.error('Geolocation error:', error);
                setIsLocating(false);
            },
            { enableHighAccuracy: true }
        );
    }, [dispatch]);

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAddress(value);
        setIsLocated(false);

        if (value.trim().length > 2) {
            setIsSearching(true);
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?access_token=${mapboxgl.accessToken}&autocomplete=true&country=ca`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data?.features?.length > 0) {
                    setSuggestions(
                        data.features.map((feature: any) => ({
                            place_name: feature.place_name,
                            id: feature.id,
                        }))
                    );
                } else {
                    setSuggestions([]);
                }
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
            } finally {
                setIsSearching(false);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = async (suggestion: Suggestion) => {
        setAddress(suggestion.place_name);
        setSuggestions([]);
        setIsLocated(true);

        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(suggestion.place_name)}.json?access_token=${mapboxgl.accessToken}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data?.features?.length > 0) {
                const [lng, lat] = data.features[0].geometry.coordinates;
                dispatch(
                    setLocationData({
                        address: suggestion.place_name,
                        lat: lat.toString(),
                        lng: lng.toString(),
                    })
                );
            }
        } catch (error) {
            console.error('Error fetching suggestion location:', error);
        }
    };

    const handleClearInput = () => {
        setAddress('');
        setSuggestions([]);
        setIsLocated(false);
        inputRef.current?.focus();
    };

    return (
        <div className="mx-auto flex h-full w-full max-w-4xl flex-col items-center space-y-8 px-4 py-8 sm:py-12">
            <div className="relative w-full">
                <div className="flex w-full flex-col gap-1 sm:flex-row">
                    <div className="relative flex-grow">
                        <Input
                            ref={inputRef}
                            type="text"
                            placeholder="Enter your address"
                            className="h-[55px] w-full rounded-full border-2 border-purple-300 px-6 py-2 pl-12 text-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={address}
                            onChange={handleInputChange}
                        />

                        <div className="absolute left-4 top-1/2 -translate-y-1/2 transform">
                            {isSearching ? (
                                <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                            ) : (
                                <Search className="h-6 w-6 text-gray-500" />
                            )}
                        </div>

                        {address && (
                            <button
                                className="absolute right-4 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600 focus:outline-none"
                                onClick={handleClearInput}
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>

                    <div className="flex gap-4 sm:flex-shrink-0">
                        <Button
                            variant="outline"
                            className="h-14 flex-1 whitespace-nowrap rounded-full text-base transition-all duration-300 hover:bg-yellow-50 focus:ring-2 focus:ring-yellow-300 active:bg-yellow-100 sm:flex-initial"
                            onClick={fetchLocation}
                            disabled={isLocating}
                        >
                            {isLocating ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <MapPin className="mr-2 h-5 w-5" />
                            )}
                            {isLocating ? 'Locating...' : 'Locate Me'}
                        </Button>
                    </div>
                </div>

                {suggestions.length > 0 && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute z-10 mt-2 max-h-60 w-full overflow-y-auto rounded-lg bg-white shadow-lg"
                    >
                        {suggestions.map((suggestion) => (
                            <li
                                key={suggestion.id}
                                className="flex cursor-pointer text-left items-center gap-2 px-4 py-3 transition-colors duration-200 hover:bg-gray-100"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                <MapPin className="h-5 w-5 text-gray-400" />
                                <div className="flex-grow">
                                    <div className="text-sm font-semibold text-gray-800">
                                        {suggestion.place_name.split(',')[0]}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {suggestion.place_name.split(',').slice(1).join(', ')}
                                    </div>
                                </div>
                                <ChevronRight className="h-5 w-5 text-gray-400" />
                            </li>
                        ))}
                    </motion.ul>
                )}
            </div>
        </div>
    );
}