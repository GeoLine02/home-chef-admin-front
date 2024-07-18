import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITableData } from "../../types/table";
import { restaurantListService } from "../../services/restaurants";

type InitialStateType = {
  restaurantList: ITableData | null;
  filterOptions: "Nothing" | string;
  toggleConfirmationModal: boolean;
  search: string;
  isDataFetching: boolean;
  seelectRestaurantID: string | null;
  status: "idle" | "pending" | "successful" | "rejected";
  error: unknown | null;
};
export interface IRestaurantListPayloadCreator {
  page: number;
  limit: number;
  filterBy: string;
  search: string;
}

const initialState: InitialStateType = {
  restaurantList: null,
  filterOptions: "Nothing",
  toggleConfirmationModal: false,
  seelectRestaurantID: null,
  search: "",
  isDataFetching: false,
  status: "idle",
  error: null,
};

export const fetchRestaurantList: AsyncThunk<
  ITableData,
  IRestaurantListPayloadCreator,
  object
> = createAsyncThunk(
  "restaurants/list",
  async ({ page, limit, filterBy, search }: IRestaurantListPayloadCreator) => {
    try {
      const resp = await restaurantListService({
        page,
        limit,
        filterBy,
        search,
      });
      return resp;
    } catch (error) {
      console.log(error);
    }
  }
);

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setSelectedOption: (state, action) => {
      state.filterOptions = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    toggleConfirmationModal: (state) => {
      state.toggleConfirmationModal = !state.toggleConfirmationModal;
    },
    selectRestaurantID: (state, action) => {
      state.seelectRestaurantID = action.payload;
    },
  },
  extraReducers: (builder) => {
    // restaurant list
    builder
      .addCase(fetchRestaurantList.pending, (state) => {
        state.status = "pending";
        state.isDataFetching = true;
      })
      .addCase(fetchRestaurantList.fulfilled, (state, action) => {
        state.status = "successful";
        state.isDataFetching = false;
        state.restaurantList = action.payload;
      })
      .addCase(fetchRestaurantList.rejected, (state, action) => {
        state.status = "rejected";
        state.isDataFetching = false;
        state.error = action.error;
      });
  },
});

export const {
  setSelectedOption,
  setSearch,
  toggleConfirmationModal,
  selectRestaurantID,
} = restaurantSlice.actions;
export default restaurantSlice.reducer;
