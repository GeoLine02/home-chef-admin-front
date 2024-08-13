import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./features/restaurantSlice";
import tableReducer from "./features/tableSlice";
import restaurantSettingsReducer from "./features/restaurantSettingsSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    restaurantReducer: restaurantReducer,
    tableReducer: tableReducer,
    restaurantSettingsReducer: restaurantSettingsReducer,
    userReducer: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
