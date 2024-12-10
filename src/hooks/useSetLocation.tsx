import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const useSetLocation = () => {
    const router = useRouter();

    // Select location data from Redux store
    const location = useSelector((state: any) => state.locateMe);

    useEffect(() => {
        // Get location data from cookies if not in Redux
        const locationFromCookies = Cookies.get('location');

        let finalLocation = location;

        // Parse cookie data if Redux doesn't have location
        if (!finalLocation && locationFromCookies) {
            finalLocation = JSON.parse(locationFromCookies);
        }

        // If we have location, set it in the URL
        if (finalLocation?.lat && finalLocation?.long) {
            const params = new URLSearchParams({
                lat: finalLocation.lat,
                long: finalLocation.long,
            });

            // Set the query parameters without refreshing the page
            router.replace(`?${params.toString()}`);
        }
    }, [location, router]);
};

export default useSetLocation;
