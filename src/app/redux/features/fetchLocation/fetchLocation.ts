import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface LocationState {
  address: string | null;
  lat: string | null;
  long: string | null;
}

// Helper function to safely access cookies
const getLocationFromCookies = () => {
  const storedLocation = Cookies.get("locations");
  return storedLocation ? JSON.parse(storedLocation) : null;
};

// Helper function to update the URL parameters
const updateUrlParams = (lat: string, lng: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set("lat", lat);
  url.searchParams.set("lng", lng);
  window.history.replaceState({}, "", url.toString());
};

// Initialize the state from cookies
const initialState: LocationState = {
  address: getLocationFromCookies()?.address || null,
  lat: getLocationFromCookies()?.lat || null,
  long: getLocationFromCookies()?.lng || null,
};

// Check if lat and long are available and set in URL on reload
if (initialState.lat && initialState.long) {
  updateUrlParams(initialState.lat, initialState.long);
}

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocationData: (
      state,
      action: PayloadAction<{ address: string; lat: string; lng: string }>
    ) => {
      const { address, lat, lng } = action.payload;
      state.address = address;
      state.lat = lat;
      state.long = lng;

      // Save to cookies
      Cookies.set(
        "locations",
        JSON.stringify({ address, lat, lng }),
        { expires: 7 } // Expiration of 7 days
      );

      // Update the URL parameters
      updateUrlParams(lat, lng);
    },
    removeLocationData: (state) => {
      state.address = null;
      state.lat = null;
      state.long = null;

      // Remove from cookies
      Cookies.remove("locations");

      // Remove URL parameters
      const url = new URL(window.location.href);
      url.searchParams.delete("lat");
      url.searchParams.delete("lng");
      window.history.replaceState({}, "", url.toString());
    },
    reAddLocationData: (state) => {
      const savedLocation = Cookies.get("locations");
      if (savedLocation) {
        const { address, lat, lng } = JSON.parse(savedLocation);
        state.address = address;
        state.lat = lat;
        state.long = lng;

        // Optionally, re-add URL parameters
        updateUrlParams(lat, lng);
      }
    },
  },
});

export const { setLocationData, removeLocationData, reAddLocationData } =
  locationSlice.actions;
export default locationSlice.reducer;
