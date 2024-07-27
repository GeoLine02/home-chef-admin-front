import { createSlice } from "@reduxjs/toolkit";

type IinitialState = {
  currentPage: number;
  dataPerPage: number;
};

const initialState: IinitialState = {
  currentPage: 1,
  dataPerPage: 10,
};

const tableSlice = createSlice({
  name: "tableSlice",
  initialState,
  reducers: {
    setCurrentPageAction(state, action) {
      state.currentPage = action.payload;
    },
    setDataPerPageAction(state, action) {
      state.dataPerPage = action.payload;
    },
  },
});

export const { setCurrentPageAction, setDataPerPageAction } =
  tableSlice.actions;
export default tableSlice.reducer;
