import { IUsersListPayloadCreator } from "../../store/features/userSlice";
import { IUserFormValues } from "../../types/user";
import { http } from "../../utils/http";

// get user list
export const UserListService = async ({
  page,
  limit,
  filterBy,
  search,
}: IUsersListPayloadCreator) => {
  try {
    const apiCallOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    };
    const res = await http(
      `/users/?page=${page}&limit=${limit}&filterBy=${filterBy}&search=${search}`,
      apiCallOptions
    );
    if (res.ok) {
      return res.json();
    }
  } catch (error) {
    console.log(error);
  }
};

export const userByIdService = async (id: number) => {
  try {
    const apiCallOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    };
    const res = await http(`/users/${id}`, apiCallOptions);
    if (res.ok) {
      return res.json();
    }
  } catch (error) {
    console.log(error);
  }
};

// create new user
export const createUserService = async (userFormValues: IUserFormValues) => {
  try {
    const apiCallOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(userFormValues),
    };
    const res = await http("/users/create", apiCallOptions);
    if (res.ok) {
      return res.json();
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUserService = async (
  id: number,
  updatedUserValues: IUserFormValues
) => {
  try {
    const apiCallOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(updatedUserValues),
    };
    const resp = await http(`/users/update/${id}`, apiCallOptions);
    if (resp.ok) {
      return resp.json();
    }
  } catch (error) {
    console.log(error);
  }
};

// delete user
export const userDeleteServcie = async (id: number) => {
  console.log(id);
  try {
    const apiCallOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    };
    const res = await http(`/users/delete/${id}`, apiCallOptions);
    if (res.ok) {
      return res.json();
    }
  } catch (error) {
    console.log(error);
  }
};
