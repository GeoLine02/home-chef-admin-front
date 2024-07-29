import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./features/restaurantSlice";
import productReducer from "./features/productSlice";
import tableReducer from "./features/tableSlice";
import restaurantSettingsReducer from "./features/restaurantSettingsSlice";

export const store = configureStore({
  reducer: {
    restaurantReducer,
    productReducer,
    tableReducer,
    restaurantSettingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
