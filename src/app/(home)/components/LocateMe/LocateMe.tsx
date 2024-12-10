import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Loader2, MapPin } from 'lucide-react'; // Replace with your icons import
import { Button } from '@/components/ui/button';

const LocateMe = ({ isLocating, handleLocateMe }: any) => {
    const buttonRef = useRef(null);

    useEffect(() => {
        if (isLocating) {
            // Add a GSAP animation for the button when locating
            gsap.to(buttonRef.current, {
                backgroundPosition: '200% center',
                duration: 1,
                repeat: -1,
                ease: 'linear',
            });
        } else {
            // Kill animation when not locating
            gsap.killTweensOf(buttonRef.current);
            gsap.set(buttonRef.current, { backgroundPosition: '0 center' });
        }
    }, [isLocating]);

    return (
        <Button
            ref={buttonRef}
            variant="outline"
            className="h-14 flex-1 whitespace-nowrap rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-[length:200%_200%] text-base transition-all duration-300 hover:bg-yellow-50 focus:ring-2 focus:ring-yellow-300 active:bg-yellow-100 sm:flex-initial"
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
    );
};

export default LocateMe;
