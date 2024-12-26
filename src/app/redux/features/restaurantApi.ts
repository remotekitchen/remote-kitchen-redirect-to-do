import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API slice
export const restaurantApi = createApi({
  reducerPath: "restaurant_api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.chatchefs.com/remote-kitchen/api/v1/",
  }),
  endpoints: (builder) => ({
    getRestaurantList: builder.query({
      query: ({ allParams }) => `restaurant/lists/chatchef?${allParams}`,
    }),
  }),
});

// Export the auto-generated hook for the `getRestaurantList` query
export const { useGetRestaurantListQuery } = restaurantApi;
