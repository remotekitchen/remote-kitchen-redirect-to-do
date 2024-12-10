'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Search, Loader2, X, ChevronRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/app/redux/hooks/hooks';
import { setLocationData } from '@/app/redux/features/fetchLocation/fetchLocation';

type Suggestion = {
    place_id: string;
    description: string;
};

declare global {
    interface Window {
        google: any;
    }
}

export default function FindLocation() {
    const [address, setAddress] = useState<string>('');
    const [isLocating, setIsLocating] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [isLocated, setIsLocated] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLUListElement>(null);

    const dispatch = useDispatch();
    const locateMeData = useAppSelector((state: any) => state.locateMe);

    // Initialize address from Redux store
    useEffect(() => {
        if (locateMeData?.address) {
            setAddress(locateMeData.address || '');
        }
    }, [locateMeData?.address]);

    // Intro animation for container
    useEffect(() => {
        gsap.set(containerRef.current, { autoAlpha: 0, y: 50 });
        gsap.to(containerRef.current, {
            duration: 1,
            autoAlpha: 1,
            y: 0,
            ease: 'power3.out',
        });
    }, []);

    // Suggestions animation
    useEffect(() => {
        if (suggestions.length > 0 && suggestionsRef.current) {
            gsap.fromTo(
                Array.from(suggestionsRef.current.children),
                { autoAlpha: 0, y: -10 },
                {
                    autoAlpha: 1,
                    y: 0,
                    stagger: 0.05,
                    ease: 'power2.out',
                    duration: 0.3,
                },
            );
        }
    }, [suggestions]);

    const fetchLocation = useCallback(() => {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                if (!window.google?.maps) {
                    console.error('Google Maps API is not available.');
                    return;
                }

                const geocoder = new window.google.maps.Geocoder();
                const latLng = { lat: latitude, lng: longitude };

                geocoder.geocode({ location: latLng }, (results: any, status: any) => {
                    if (status === 'OK' && results[0]) {
                        const formattedAddress = results[0].formatted_address;
                        setAddress(formattedAddress || '');
                        setIsLocated(true);
                        dispatch(
                            setLocationData({
                                address: formattedAddress,
                                lat: latitude.toString(),
                                lng: longitude.toString(),
                            }),
                        );
                    } else {
                        console.error('Geocoder failed due to: ' + status);
                    }
                });
            },
            (error) => console.error('Geolocation error:', error),
            { enableHighAccuracy: true },
        );
    }, [dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value || '';
        setAddress(value);
        setSelectedIndex(-1);
        setIsLocated(false);

        if (!value.trim()) {
            setSuggestions([]);
            return;
        }

        if (value.length > 2 && window.google?.maps?.places) {
            const autocompleteService =
                new window.google.maps.places.AutocompleteService();
            autocompleteService.getPlacePredictions(
                { input: value },
                (predictions: any, status: any) => {
                    if (
                        status === window.google.maps.places.PlacesServiceStatus.OK &&
                        predictions
                    ) {
                        setSuggestions(
                            predictions.map((prediction: any) => ({
                                description: prediction.description,
                                place_id: prediction.place_id,
                            })),
                        );
                    } else {
                        setSuggestions([]);
                    }
                },
            );
        }
    };

    const handleSuggestionClick = (suggestion: Suggestion) => {
        setAddress(suggestion.description || '');
        setSuggestions([]);
        setIsLocated(true);
    };

    const handleLocateMe = () => {
        setIsLocating(true);
        gsap.fromTo(
            inputRef.current,
            { borderColor: '#FFE600', boxShadow: '0 0 0 0 rgba(255, 230, 0, 0.7)' },
            {
                borderColor: '#FFE600',
                boxShadow: '0 0 0 10px rgba(255, 230, 0, 0)',
                duration: 0.8,
                repeat: 2,
                ease: 'power2.inOut',
            },
        );
        fetchLocation();
        setTimeout(() => setIsLocating(false), 2400);
    };

    const handleClearInput = () => {
        setAddress('');
        setSuggestions([]);
        setIsLocated(false);
        inputRef.current?.focus();
    };

    return (
        <div
            className="mx-auto flex h-full w-full max-w-4xl flex-col items-center space-y-8 px-4 py-8 sm:py-12"
            ref={containerRef}
        >
            <div className="relative w-full">
                <div className="flex w-full flex-col gap-1 sm:flex-row">
                    <div className="relative flex-grow">
                        <Input
                            ref={inputRef}
                            type="text"
                            placeholder="Enter your address"
                            className="h-[55px] w-full rounded-full border-2 border-purple-300 px-6 py-2 pl-12 text-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={address || ''}
                            onChange={handleInputChange}
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 transform">
                            <Search className="h-6 w-6 text-gray-500" />
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
                            onClick={handleLocateMe}
                            disabled={isLocating}
                        >
                            {isLocating ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <MapPin className="mr-2 h-5 w-5" />
                            )}
                            {isLocating ? 'Locating...' : 'Locate me'}
                        </Button>
                    </div>
                </div>
                {suggestions.length > 0 && (
                    <ul
                        ref={suggestionsRef}
                        className="absolute z-10 mt-2 max-h-60 w-full overflow-y-auto rounded-lg bg-white shadow-lg"
                    >
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={suggestion.place_id}
                                className={`flex cursor-pointer items-center gap-2 px-4 py-3 transition-colors duration-200 hover:bg-gray-100 ${index === selectedIndex ? 'bg-gray-200' : ''
                                    }`}
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                <MapPin className="h-5 w-5 text-gray-400" />
                                <div className="flex-grow">
                                    <div className="text-sm font-semibold text-gray-800">
                                        {suggestion.description.split(',')[0]}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {suggestion.description.split(',').slice(1).join(', ')}
                                    </div>
                                </div>
                                <ChevronRight className="h-5 w-5 text-gray-400" />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>

    );
}
