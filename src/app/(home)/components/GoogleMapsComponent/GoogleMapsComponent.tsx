import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

// Define the container styles for the map
const containerStyle = {
    width: '100%',
    height: '400px',
};

// Define the center of the map
const center = {
    lat: -3.745, // Replace with your desired latitude
    lng: -38.523, // Replace with your desired longitude
};

const GoogleMapsComponent: React.FC = ({ children }: any) => {
    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_SECRET || ''}>
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                {/* Add map children components like markers here */}
                {children}
            </GoogleMap>
        </LoadScript>
    );
};

export default GoogleMapsComponent;
