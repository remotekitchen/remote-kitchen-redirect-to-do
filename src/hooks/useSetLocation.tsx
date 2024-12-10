import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const useSetLocation = () => {
    const router = useRouter();

    // Select location data from Redux store
    const location = useSelector((state: any) => state.locateMe);

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

        // Fetch location from Redux or cookies
        let finalLocation = location;
        if (!finalLocation || !finalLocation.lat || !finalLocation.lng) {
            const locationFromCookies = Cookies.get('location');
            finalLocation = parseLocation(locationFromCookies);
        }

        // Validate finalLocation
        if (finalLocation?.lat && finalLocation?.lng) {
            // Use URLSearchParams to format query parameters
            const params = new URLSearchParams({
                lat: String(finalLocation.lat),
                lng: String(finalLocation.lng),
            });

            // Update the URL without causing re-renders
            const currentUrlParams = new URLSearchParams(window.location.search);

            // Avoid unnecessary URL updates
            if (
                currentUrlParams.get('lat') !== String(finalLocation.lat) ||
                currentUrlParams.get('lng') !== String(finalLocation.lng)
            ) {
                router.replace(`?${params.toString()}`);
            }
        } else {
            console.warn('Invalid location data. Ensure lat and lng are available.');
        }
    }, [location, router]);
};

export default useSetLocation;
