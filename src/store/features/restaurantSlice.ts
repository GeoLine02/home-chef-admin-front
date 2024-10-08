import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITableData } from "../../types/table";
import {
  createRestaurantService,
  getRestaurantByIdService,
  restaurantDeleteService,
  restaurantListService,
  updateRestaurantService,
} from "../../services/restaurants";
import { IRestaurantForm, IRestaurnatById } from "../../types/restaurant";

type IDataFetchingStatus = "idle" | "pending" | "successful" | "rejected";

type InitialStateType = {
  restaurantList: ITableData | null;
  restaurantCreationStatus: IDataFetchingStatus;
  restaurantUpdateStatus: IDataFetchingStatus;
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

export interface IUpdateRestaurantPayloadCreator {
  restaurantID: number;
  restaurantValues: IRestaurantForm;
}

const initialState: InitialStateType = {
  restaurantList: null,
  restaurantById: null,
  restaurantCreationStatus: "idle",
  restaurantUpdateStatus: "idle",
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createRestaurant: AsyncThunk<any, IRestaurantForm, object> =
  createAsyncThunk(
    "restaurant/create",
    async (restaurantValues: IRestaurantForm) => {
      try {
        const res = await createRestaurantService(restaurantValues);
        return res;
      } catch (error) {
        console.log(error);
      }
    }
  );

export const updateRestaurant: AsyncThunk<
  number,
  IUpdateRestaurantPayloadCreator,
  object
> = createAsyncThunk(
  "restaurant/update",
  async ({ restaurantID, restaurantValues }) => {
    try {
      console.log(restaurantValues);
      const resp = await updateRestaurantService(
        restaurantID,
        restaurantValues
      );
      return resp;
    } catch (error) {
      console.log(error);
    }
  }
);

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
      // restaurant create
      .addCase(createRestaurant.pending, (state) => {
        state.isDataFetching = true;
        state.restaurantCreationStatus = "pending";
      })
      .addCase(createRestaurant.fulfilled, (state) => {
        state.isDataFetching = false;
        state.restaurantCreationStatus = "successful";
      })
      .addCase(createRestaurant.rejected, (state, action) => {
        state.isDataFetching = false;
        state.restaurantCreationStatus = "rejected";
        state.error = action.payload;
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
      })
      // update Restaurant
      .addCase(updateRestaurant.pending, (state) => {
        state.isDataFetching = true;
        state.restaurantUpdateStatus = "pending";
      })
      .addCase(updateRestaurant.fulfilled, (state) => {
        state.isDataFetching = false;
        state.restaurantUpdateStatus = "successful";
      })
      .addCase(updateRestaurant.rejected, (state, action) => {
        state.isDataFetching = false;
        state.restaurantUpdateStatus = "rejected";
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
