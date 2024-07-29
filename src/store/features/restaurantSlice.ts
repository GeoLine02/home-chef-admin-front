import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITableData } from "../../types/table";
import {
  getRestaurantByIdService,
  restaurantDeleteService,
  restaurantListService,
} from "../../services/restaurants";
import { IRestaurnatById } from "../../types/restaurant";

type InitialStateType = {
  restaurantList: ITableData | null;
  toggleConfirmationModal: boolean;
  restaurantById: null | IRestaurnatById;
  search: string;
  isDataFetching: boolean;
  selectRestaurantID: string | null;
  status: "idle" | "pending" | "successful" | "rejected";
  error: unknown | null;
};
export interface IRestaurantListPayloadCreator {
  page: number;
  limit: number;
  filterBy: string | string[];
  search: string;
}

const initialState: InitialStateType = {
  restaurantList: null,
  restaurantById: null,
  toggleConfirmationModal: false,
  selectRestaurantID: null,
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

export const fetchRestaurantByID: AsyncThunk<IRestaurnatById, number, object> =
  createAsyncThunk("restaurants/id", async (id: number) => {
    try {
      const resp = await getRestaurantByIdService(id);
      return resp;
    } catch (error) {
      console.log(error);
    }
  });

export const deleteRestaurant: AsyncThunk<object, string, object> =
  createAsyncThunk("restaurant/delete", async (id: string) => {
    try {
      const resp = await restaurantDeleteService(id);
      return resp;
    } catch (error) {
      console.log(error);
    }
  });

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    // setSelectedOption: (state, action) => {
    //   state.filterOptions = action.payload;
    // },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    toggleConfirmationModal: (state) => {
      state.toggleConfirmationModal = !state.toggleConfirmationModal;
    },
    selectRestaurantID: (state, action) => {
      state.selectRestaurantID = action.payload;
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
      })
      // restaurant delete
      .addCase(deleteRestaurant.pending, (state) => {
        state.status = "pending";
        state.isDataFetching = true;
      })
      .addCase(deleteRestaurant.fulfilled, (state) => {
        if (state.restaurantList) {
          state.restaurantList.data = state.restaurantList.data.filter(
            (item) => item.id !== state.selectRestaurantID
          );
          state.status = "successful";
          state.isDataFetching = false;
        }
      })
      .addCase(deleteRestaurant.rejected, (state, action) => {
        state.status = "rejected";
        state.isDataFetching = false;
        state.error = action.error;
      })
      // restaurant by id
      .addCase(fetchRestaurantByID.pending, (state) => {
        state.status = "pending";
        state.isDataFetching = true;
      })
      .addCase(fetchRestaurantByID.fulfilled, (state, action) => {
        state.status = "successful";
        state.isDataFetching = false;
        state.restaurantById = action.payload;
      })
      .addCase(fetchRestaurantByID.rejected, (state, action) => {
        state.status = "rejected";
        state.isDataFetching = false;
        state.error = action.error;
      });
  },
});

export const {
  // setSelectedOption,
  setSearch,
  toggleConfirmationModal,
  selectRestaurantID,
} = restaurantSlice.actions;
export default restaurantSlice.reducer;
