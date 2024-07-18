import { IRestaurantListPayloadCreator } from "../../store/features/restaurantSlice";
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
