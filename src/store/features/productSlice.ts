import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITableData } from "../../types/table";

import { IProductById } from "../../types/product";
import {
  getProductByIdService,
  productDeleteService,
  productListService,
} from "../../services/products";

type InitialStateType = {
  productList: ITableData | null;
  toggleConfirmationModal: boolean;
  productById: null | IProductById;
  search: string;
  isDataFetching: boolean;
  selectProductId: string | null;
  status: "idle" | "pending" | "successful" | "rejected";
  error: unknown | null;
};
export interface IProductListPayloadCreator {
  page: number;
  limit: number;
  filterBy: string | string[];
  search: string;
}

const initialState: InitialStateType = {
  productList: null,
  productById: null,
  toggleConfirmationModal: false,
  selectProductId: null,
  search: "",
  isDataFetching: false,
  status: "idle",
  error: null,
};

export const fetchProductList: AsyncThunk<
  ITableData,
  IProductListPayloadCreator,
  object
> = createAsyncThunk(
  "products/list",
  async ({ page, limit, filterBy, search }: IProductListPayloadCreator) => {
    try {
      const resp = await productListService({
        page,
        limit,
        filterBy,
        search,
      });
      console.log(resp);
      return resp;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchProductByID: AsyncThunk<IProductById, number, object> =
  createAsyncThunk("products/id", async (id: number) => {
    try {
      const resp = await getProductByIdService(id);
      return resp;
    } catch (error) {
      console.log(error);
    }
  });

export const deleteProduct: AsyncThunk<object, string, object> =
  createAsyncThunk("restaurant/delete", async (id: string) => {
    try {
      const resp = await productDeleteService(id);
      return resp;
    } catch (error) {
      console.log(error);
    }
  });

const productSlice = createSlice({
  name: "product",
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
    selectProductId: (state, action) => {
      state.selectProductId = action.payload;
    },
  },
  extraReducers: (builder) => {
    // restaurant list
    builder
      .addCase(fetchProductList.pending, (state) => {
        state.status = "pending";
        state.isDataFetching = true;
      })
      .addCase(fetchProductList.fulfilled, (state, action) => {
        state.status = "successful";
        state.isDataFetching = false;
        state.productList = action.payload;
      })
      .addCase(fetchProductList.rejected, (state, action) => {
        state.status = "rejected";
        state.isDataFetching = false;
        state.error = action.error;
      })
      // restaurant delete
      .addCase(deleteProduct.pending, (state) => {
        state.status = "pending";
        state.isDataFetching = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        if (state.productList) {
          state.productList.data = state.productList.data.filter(
            (item) => item.id !== state.selectProductId
          );
          state.status = "successful";
          state.isDataFetching = false;
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "rejected";
        state.isDataFetching = false;
        state.error = action.error;
      })
      // restaurant by id
      .addCase(fetchProductByID.pending, (state) => {
        state.status = "pending";
        state.isDataFetching = true;
      })
      .addCase(fetchProductByID.fulfilled, (state, action) => {
        state.status = "successful";
        state.isDataFetching = false;
        state.productById = action.payload;
      })
      .addCase(fetchProductByID.rejected, (state, action) => {
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
  selectProductId,
} = productSlice.actions;
export default productSlice.reducer;
