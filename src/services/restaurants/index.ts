import { IRestaurantListPayloadCreator } from "../../store/features/restaurantSlice";
import { IRestaurantForm } from "../../types/restaurant";
import { http } from "../../utils/http";

// restaurant list
export const restaurantListService = async ({
  page,
  limit,
  filterBy,
  search,
}: IRestaurantListPayloadCreator) => {
  try {
    const apiCallOptions = {
      header: {
        "Content-Type": "application/json",
      },
      method: "GET",
    };
    const resp = await http(
      `/restaurant/?page=${page}&limit=${limit}&filterBy=${filterBy}&search=${search}`,
      apiCallOptions
    );
    return resp.json();
  } catch (error) {
    console.log(error);
  }
};

export const getRestaurantByIdService = async (id: number) => {
  try {
    const apiCallOptions = {
      header: {
        "Content-Type": "applictaion/json",
      },
      method: "GET",
    };
    const resp = await http(`/restaurant/${id}`, apiCallOptions);
    return resp.json();
  } catch (error) {
    console.log(error);
  }
};

// create restaurant
export const createRestaurantService = async (
  restaurantData: IRestaurantForm
) => {
  try {
    const apiCallOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(restaurantData),
    };
    const resp = await http("/restaurant/create", apiCallOptions);
    return resp.json();
  } catch (error) {
    console.log(error);
  }
};

// update restaurant by id
export const updateRestaurantService = async (
  restaurantId: number,
  restaurantValues: IRestaurantForm
) => {
  console.log(restaurantValues);
  try {
    const apiCallOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restaurantValues),
    };
    const resp = await http(
      `/restaurant/update/${restaurantId}`,
      apiCallOptions
    );
    if (resp.ok) {
      return resp.json();
    }
  } catch (error) {
    console.log(error);
  }
};

// delete restaurant
export const restaurantDeleteService = async (id: string) => {
  try {
    const apiCallOptions = {
      header: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    };
    const resp = await http(`/restaurant/delete/${id}`, apiCallOptions);
    return resp.json();
  } catch (error) {
    console.log(error);
  }
};

// get restaurant types
export const allRestaurantTypeService = async () => {
  try {
    const apiCallOptions = {
      header: {
        "Content-Type": "application/json",
      },
      method: "GET",
    };
    const resp = await http("/restaurantTypes", apiCallOptions);
    return resp.json();
  } catch (error) {
    console.log(error);
  }
};

// choose restaurnt types
export const chooseRestaurntTypeService = async (options: object) => {
  try {
    const apiCallOptions = {
      header: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ options: options }),
    };
    const resp = await http("/restaurantTypes/select", apiCallOptions);
    return resp.json();
  } catch (error) {
    console.log(error);
  }
};

// get week days
export const getweekDaysService = async () => {
  try {
    const apiCallOptions = {
      header: {
        "Content-Type": "application/json",
      },
      method: "GET",
    };
    const resp = await http("/days", apiCallOptions);
    return resp.json();
  } catch (error) {
    console.log(error);
  }
};
