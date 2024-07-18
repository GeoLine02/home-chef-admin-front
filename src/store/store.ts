import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./features/restaurantSlice";
import tableReducer from "./features/tableSlice";

export const store = configureStore({
  reducer: { restaurantReducer: restaurantReducer, tableReducer: tableReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
