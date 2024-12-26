import { configureStore, combineReducers } from "@reduxjs/toolkit";
import locateMeReducer from "./features/fetchLocation/fetchLocation";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore, PersistConfig } from "redux-persist";
import { apiSlice } from "./apiSlice";
import { restaurantApi } from "./features/restaurantApi";

// Type for the cart slice persist configuration
type CartPersistConfig = PersistConfig<ReturnType<typeof rootReducer>> & {
  whitelist: string[];
};

// Configure persistence for the cart slice
const cartPersistConfig: CartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"], // Persist only the `items` field in the cart slice
};

// Combine all reducers
const rootReducer = combineReducers({
  locateMe: locateMeReducer,
  [apiSlice.reducerPath]: apiSlice.reducer, // Include RTK Query reducer
  [restaurantApi.reducerPath]: restaurantApi.reducer, // Include RTK Query reducer
});

// Type for root reducer persist configuration
type RootPersistConfig = PersistConfig<ReturnType<typeof rootReducer>> & {
  blacklist: string[];
};

// Persist the root reducer
const persistConfig: RootPersistConfig = {
  key: "root",
  storage,
  blacklist: [apiSlice.reducerPath, restaurantApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
          "persist/FLUSH",
        ],
      }, // Ignore warnings for redux-persist actions
    })
      .concat(apiSlice.middleware)
      .concat(restaurantApi.middleware),
});

// Persistor for the store
export const persistor = persistStore(store);

// Define the root state type and dispatch type based on the store
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
