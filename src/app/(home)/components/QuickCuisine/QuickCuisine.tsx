'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useSearchParams, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const categories = [
    { id: 'grocery', name: 'Grocery', icon: '🏪' },
    { id: 'pizza', name: 'Pizza', icon: '🍕' },
    { id: 'indian', name: 'Indian', icon: '🍛' },
    { id: 'sushi', name: 'Sushi', icon: '🍱' },
    { id: 'alcohol', name: 'Alcohol', icon: '🍾' },
    { id: 'fast-food', name: 'Fast Food', icon: '🍟' },
    { id: 'convenience', name: 'Convenience', icon: '🏪' },
    { id: 'bubble-tea', name: 'Bubble Tea', icon: '🧋' },
    { id: 'chinese', name: 'Chinese', icon: '🥡' },
    { id: 'korean', name: 'Korean', icon: '🍜' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' },
    { id: 'burgers', name: 'Burgers', icon: '🍔' },
    { id: 'wings', name: 'Wings', icon: '🍗' },
    { id: 'soup', name: 'Soup', icon: '🥣' },
    { id: 'vietnamese', name: 'Vietnamese', icon: '🍜' },
    { id: 'mexican', name: 'Mexican', icon: '🌮' },
    { id: 'healthy', name: 'Healthy', icon: '🥗' },
    { id: 'thai', name: 'Thai', icon: '🍲' },
    { id: 'halal', name: 'Halal', icon: '🥙' },
    { id: 'asian', name: 'Asian', icon: '🍱' },
    { id: 'japanese', name: 'Japanese', icon: '🍱' },
    { id: 'bbq', name: 'BBQ', icon: '🍖' },
    { id: 'sandwich', name: 'Sandwich', icon: '🥪' },
    { id: 'ice-cream', name: 'Ice Cream', icon: '🍦' },
    { id: 'electronics', name: 'Electronics', icon: '📱' },
];

export function QuickCuisine() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        skipSnaps: false,
        dragFree: true,
    });

    const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
        null,
    );

    const searchParams = useSearchParams();
    const router = useRouter();

    React.useEffect(() => {
        const cuisineParam = searchParams.get('cuisine');
        if (cuisineParam !== selectedCategory) {
            setSelectedCategory(cuisineParam);
        }
    }, [searchParams, selectedCategory]);

    const scrollPrev = React.useCallback(
        () => emblaApi && emblaApi.scrollPrev(),
        [emblaApi],
    );

    const scrollNext = React.useCallback(
        () => emblaApi && emblaApi.scrollNext(),
        [emblaApi],
    );

    const onSelect = React.useCallback((emblaApi: any) => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, []);

    React.useEffect(() => {
        if (!emblaApi) return;

        onSelect(emblaApi);
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    const toggleCategory = (categoryId: string) => {
        const newCategory = selectedCategory === categoryId ? null : categoryId;
        setSelectedCategory(newCategory);

        const newSearchParams = new URLSearchParams(searchParams);
        if (newCategory) {
            newSearchParams.set('cuisine', newCategory);
        } else {
            newSearchParams.delete('cuisine');
        }

        router.replace(`?${newSearchParams.toString()}`, { scroll: false });
    };

    return (
        <div className="relative mt-5 w-full">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex touch-pan-y">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="relative mr-4 flex-none first:pl-4 last:pr-4"
                        >
                            <Button
                                variant="ghost"
                                className={cn(
                                    'flex h-auto flex-col items-center gap-2 px-4 py-3 hover:bg-accent',
                                    selectedCategory === category.id && 'bg-accent',
                                )}
                                onClick={() => toggleCategory(category.id)}
                            >
                                <div
                                    className={cn(
                                        'flex h-16 w-16 items-center justify-center rounded-full',
                                        selectedCategory === category.id
                                            ? 'bg-primary'
                                            : 'bg-accent',
                                    )}
                                >
                                    <span className="text-3xl">{category.icon}</span>
                                </div>
                                <span className="text-sm font-medium">{category.name}</span>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
            <Button
                variant="ghost"
                size="icon"
                className={cn(
                    'absolute -left-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background shadow-md',
                    prevBtnDisabled && 'hidden',
                )}
                disabled={prevBtnDisabled}
                onClick={scrollPrev}
            >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous slide</span>
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className={cn(
                    'absolute -right-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background shadow-md',
                    nextBtnDisabled && 'hidden',
                )}
                disabled={nextBtnDisabled}
                onClick={scrollNext}
            >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next slide</span>
            </Button>
        </div>
    );
}
