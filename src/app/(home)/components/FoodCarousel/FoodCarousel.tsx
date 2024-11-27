'use client';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
    { label: 'Burger', image: 'food_gallery1.png', color: 'bg-orange-100' },
    { label: 'Pizza', image: 'food_gallery2.png', color: 'bg-blue-100' },
    { label: 'Tacos', image: 'food_gallery3.png', color: 'bg-yellow-100' },
    { label: 'Noodles', image: 'food_gallery4.png', color: 'bg-emerald-100' },
    { label: 'Dairy', image: 'food_gallery13.png', color: 'bg-green-100' },
    { label: 'Rice', image: 'food_gallery8.png', color: 'bg-purple-100' },
    { label: 'Dumpling', image: 'food_gallery9.png', color: 'bg-red-100' },
    { label: 'Salad', image: 'food_gallery10.png', color: 'bg-amber-100' },
    { label: 'Drink', image: 'food_gallery11.png', color: 'bg-orange-100' },
];

export default function FoodCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: 'start' },
        [Autoplay({ delay: 3000 })],
    );

    const scrollPrev = () => emblaApi?.scrollPrev();
    const scrollNext = () => emblaApi?.scrollNext();

    return (
        <div className="relative mx-auto w-full max-w-6xl px-8">
            {/* Left Navigation Button */}
            <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2"
                onClick={scrollPrev}
            >
                <ChevronLeft className="h-6 w-6" />
            </Button>

            {/* Carousel Container */}
            <div ref={emblaRef} className="overflow-hidden">
                <div className="flex">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className={`mx-2 flex h-[150px] min-w-[150px] flex-col items-center justify-center ${category?.color} rounded-xl shadow transition-transform hover:scale-105`}
                        >
                            <img
                                src={`/${category.image}`}
                                alt={category.label}
                                className="h-[80px] w-[80px] rounded-full object-cover"
                            />
                            <span className="mt-2 text-sm font-medium text-gray-800">
                                {category.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Navigation Button */}
            <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2"
                onClick={scrollNext}
            >
                <ChevronRight className="h-6 w-6" />
            </Button>
        </div>
    );
}