import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  restaurantList: string[] | [];
};

const initialState: InitialStateType = {
  restaurantList: [],
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

// export const {} = restaurantSlice.actions;
export default restaurantSlice.reducer;
