import { IProductListPayloadCreator } from "../../store/features/productSlice";
import { http } from "../../utils/http";

// restaurant list
export const productListService = async ({
  page,
  limit,
  filterBy,
  search,
}: IProductListPayloadCreator) => {
  try {
    const apiCallOptions = {
      header: {
        "Content-Type": "application/json",
      },
      method: "GET",
    };
    const resp = await http(
      `/products/?page=${page}&limit=${limit}&filterBy=${filterBy}&search=${search}`,
      apiCallOptions
    );
    return resp.json();
  } catch (error) {
    console.log(error);
  }
};

export const getProductByIdService = async (id: number) => {
  try {
    const apiCallOptions = {
      header: {
        "Content-Type": "applictaion/json",
      },
      method: "GET",
    };
    const resp = await http(`/products/${id}`, apiCallOptions);
    return resp.json();
  } catch (error) {
    console.log(error);
  }
};

// create restaurant
export const createProductService = async (restaurantData: FormData) => {
  try {
    const apiCallOptions = {
      method: "POST",
      body: restaurantData,
    };
    const resp = await http("/products/create", apiCallOptions);
    return resp;
  } catch (error) {
    console.log(error);
  }
};

// update restaurant by id
export const updateProductService = async (
  productId: number,
  formData: FormData
) => {
  try {
    const apiCallOptions = {
      method: "PATCH",
      body: formData,
    };
    const resp = await http(`/products/update/${productId}`, apiCallOptions);
    return resp;
  } catch (error) {
    console.log(error);
  }
};

// delete restaurant
export const productDeleteService = async (id: string) => {
  try {
    const apiCallOptions = {
      header: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    };
    const resp = await http(`/products/delete/${id}`, apiCallOptions);
    return resp.json();
  } catch (error) {
    console.log(error);
  }
};

// get restaurant types
export const allProductTypeService = async () => {
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
