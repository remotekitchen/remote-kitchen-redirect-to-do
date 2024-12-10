import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // eslint-disable-next-line no-undef
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_HOST}api/`,
    prepareHeaders: (headers, { getState }) => {
      let token;
      const auth = localStorage.getItem("token");

      // console.log("auth", auth);
      if (auth) {
        try {
          token = JSON.parse(auth).token;
        } catch (e) {
          console.error("Error parsing auth token from localStorage", e);
        }
      }
      if (token) {
        headers.set("Authorization", `token ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "RestaurantSpecificUserData",
    "Orders",
    "UserDetails",
    "Restaurant",
    "MenuItems",
    "Address",
    "RewardPoints",
    "UserLuckyFlip",
    "UserWallet",
  ],
  endpoints: () => ({}),
});
