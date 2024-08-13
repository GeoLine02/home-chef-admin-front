import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser, IUserFormValues } from "../../types/user";
import {
  createUserService,
  updateUserService,
  userByIdService,
  userDeleteServcie,
  UserListService,
} from "../../services/user";
import { ITableData } from "../../types/table";

type IDataFetchingStatuses = "idle" | "pending" | "successful" | "rejected";

type initialState = {
  status: "idle" | "pending" | "success" | "rejected";
  userListFetchingStatus: IDataFetchingStatuses;
  userCreationStatus: IDataFetchingStatuses;
  userEditStatus: IDataFetchingStatuses;
  userByIdFetchingStatus: IDataFetchingStatuses;
  userDeleteStatus: IDataFetchingStatuses;
  error: null | unknown;
  userList: null | ITableData;
  createdUser: null | IUser;
  userByID: null | IUser;
  search: string;
  toggleConfirmationModal: boolean;
  selectUserID: null | string;
};

export interface IUsersListPayloadCreator {
  page: number;
  limit: number;
  filterBy: string | string[];
  search: string;
}

export interface IUserUpdatePayloadCreator {
  id: number;
  updatedUserValues: IUserFormValues;
}

const initialState: initialState = {
  status: "idle",
  error: null,
  userList: null,
  createdUser: null,
  search: "",
  toggleConfirmationModal: false,
  selectUserID: null,
  userByID: null,
  userCreationStatus: "idle",
  userEditStatus: "idle",
  userByIdFetchingStatus: "idle",
  userListFetchingStatus: "idle",
  userDeleteStatus: "idle",
};

export const fetchUserList: AsyncThunk<
  ITableData,
  IUsersListPayloadCreator,
  object
> = createAsyncThunk(
  "user/list",
  async ({ page, filterBy, limit, search }: IUsersListPayloadCreator) => {
    try {
      const resp = await UserListService({
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

// fetch single user
export const fetchUserByID: AsyncThunk<IUser, number, object> =
  createAsyncThunk("users/single", async (id: number) => {
    try {
      const res = userByIdService(id);
      return res;
    } catch (error) {
      console.log(error);
    }
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createUser: AsyncThunk<any, IUserFormValues, object> =
  createAsyncThunk("user/create", async (userFormValues: IUserFormValues) => {
    try {
      const res = await createUserService(userFormValues);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateUser: AsyncThunk<any, IUserUpdatePayloadCreator, object> =
  createAsyncThunk("user/edit", async ({ id, updatedUserValues }) => {
    try {
      const res = await updateUserService(id, updatedUserValues);
      return res;
    } catch (error) {
      console.log(error);
    }
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteUser: AsyncThunk<any, number, object> = createAsyncThunk(
  "user/delete",
  async (id: number) => {
    try {
      const res = await userDeleteServcie(id);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    toggleConfirmationModal: (state) => {
      state.toggleConfirmationModal = !state.toggleConfirmationModal;
    },
    selectUserID: (state, action) => {
      state.selectUserID = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // user list
      .addCase(fetchUserList.pending, (state) => {
        state.userListFetchingStatus = "pending";
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.userListFetchingStatus = "successful";
        state.userList = action.payload;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.userListFetchingStatus = "rejected";
        state.error = action.error;
      })
      // user by id
      .addCase(fetchUserByID.pending, (state) => {
        state.userByIdFetchingStatus = "pending";
      })
      .addCase(fetchUserByID.fulfilled, (state, action) => {
        state.userByIdFetchingStatus = "successful";
        state.userByID = action.payload;
      })
      .addCase(fetchUserByID.rejected, (state, action) => {
        state.userByIdFetchingStatus = "rejected";
        state.error = action.error;
      })
      // new user
      .addCase(createUser.pending, (state) => {
        state.userCreationStatus = "pending";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.userCreationStatus = "successful";
        state.createdUser = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.userCreationStatus = "rejected";
        state.error = action.error;
      })
      // edit user
      .addCase(updateUser.pending, (state) => {
        state.userEditStatus = "pending";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userEditStatus = "successful";
        state.userByID = { ...state.userByID, ...action.payload };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.userEditStatus = "rejected";
        state.error = action.error;
      })
      // delete user
      .addCase(deleteUser.pending, (state) => {
        state.userDeleteStatus = "pending";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.userDeleteStatus = "successful";
        if (state.userList) {
          state.userList.data = state.userList.data.filter(
            (user: IUser) => user.id !== action.payload
          );
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.userDeleteStatus = "rejected";
        state.error = action.error;
      });
  },
});
export const { selectUserID, setSearch, toggleConfirmationModal } =
  userSlice.actions;
export default userSlice.reducer;
