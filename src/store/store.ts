import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./features/restaurantSlice"
export const store = configureStore({
  reducer: {restaurantReducer},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
