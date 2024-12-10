import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const useSetLocation = () => {
    const router = useRouter();
    const location = useSelector((state: any) => state.locateMe); // Ensure this is at the top level

    useEffect(() => {
        // Helper function to parse location safely
        const parseLocation = (locationString: string | undefined) => {
            if (!locationString) return null;
            try {
                return JSON.parse(locationString);
            } catch (error) {
                console.error('Error parsing location from cookies:', error);
                return null;
            }
        };

        // Final location logic
        let finalLocation = location;

        if (!finalLocation || !finalLocation.lat || !finalLocation.lng) {
            const locationFromCookies = Cookies.get('location');
            finalLocation = parseLocation(locationFromCookies);
        }

        // Validate finalLocation and update URL
        if (finalLocation?.lat && finalLocation?.lng) {
            const params = new URLSearchParams({
                lat: String(finalLocation.lat),
                lng: String(finalLocation.lng),
            });

            const currentUrlParams = new URLSearchParams(window.location.search);
            if (
                currentUrlParams.get('lat') !== String(finalLocation.lat) ||
                currentUrlParams.get('lng') !== String(finalLocation.lng)
            ) {
                router.replace(`?${params.toString()}`);
            }
        } else {
            console.warn('Invalid location data. Ensure lat and lng are available.');
        }
    }, [router, location]); // Include `location` in the dependency array
};

export default useSetLocation;
