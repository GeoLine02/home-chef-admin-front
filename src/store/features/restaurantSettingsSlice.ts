/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  allRestaurantTypeService,
  getweekDaysService,
} from "../../services/restaurants";

type IinitialState = {
  days: [] | any[];
  workingHours: Date[] | [];
  status: "idle" | "pending" | "successful" | "rejected";
  error: unknown | null;
  isDataFetching: boolean;
  restaurnatTypes: [] | any[];
};

const initialState: IinitialState = {
  days: [],
  workingHours: [],
  status: "idle",
  isDataFetching: false,
  error: null,
  restaurnatTypes: [],
};

export const getWeekDays: AsyncThunk<any[], void, object> = createAsyncThunk(
  "restaurant-settings/getWeekDays",
  async () => {
    try {
      const resp = await getweekDaysService();
      return resp;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getRestaurntTypes: AsyncThunk<any[], void, object> =
  createAsyncThunk("restaurnatTypes/get", async () => {
    try {
      const resp = await allRestaurantTypeService();
      return resp;
    } catch (error) {
      console.log(error);
    }
  });

const restaurantSettingsReducer = createSlice({
  name: "restaurant-settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeekDays.pending, (state) => {
        state.status = "pending";
        state.isDataFetching = true;
      })
      .addCase(getWeekDays.fulfilled, (state, action) => {
        state.status = "successful";
        state.isDataFetching = false;
        state.days = action.payload;
      })
      .addCase(getWeekDays.rejected, (state, action) => {
        state.status = "rejected";
        state.isDataFetching = false;
        state.error = action.error;
      })
      // get restant types
      .addCase(getRestaurntTypes.pending, (state) => {
        state.status = "pending";
        state.isDataFetching = true;
      })
      .addCase(getRestaurntTypes.fulfilled, (state, action) => {
        state.status = "successful";
        state.isDataFetching = false;
        state.restaurnatTypes = action.payload;
      })
      .addCase(getRestaurntTypes.rejected, (state, action) => {
        state.status = "rejected";
        state.isDataFetching = false;
        state.error = action.error;
      });
  },
});

export default restaurantSettingsReducer.reducer;
