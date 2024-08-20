export interface IRestaurant {
  id: number;
  name: string;
  img: string | null;
  email: string;
  phone: string;
}

export interface IRestaurnatById extends IRestaurant {
  ownerId: number;
  restaurantID: number;
  countryID: number;
  address: string;
  latitude: string;
  longitude: string;
  city: string;
  workingDays: number[];
  restaurantTypes: number[];
  workingFrom: string;
  workingTill: string;
}

export interface IRestaurantForm {
  name: string;
  ownerId: string;
  countryId: number;
  latitude: number;
  longitude: number;
  email: string;
  address: string;
  city: string;
  phone: string;
  imageCover: string;
  imageIntro: string;
  workingDays: any[] | [];
  restaurantTypes: number[];
  workingFrom: string;
  workingTill: string;
}
