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
  latitude: number;
  longitude: number;
  city: string;
  workingDays: number[];
  restaurantTypes: number[];
  workingFrom: string;
  workingTill: string;
  introImage: string;
  coverImage: string;
}

export interface IRestaurantForm {
  name: string;
  ownerId: number | undefined;
  countryId: number;
  latitude: number | null;
  longitude: number | null;
  email: string;
  address: string;
  city: string;
  phone: string;
  imageCover: string;
  imageIntro: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  workingDays: any[] | [];
  restaurantTypes: number[];
  workingFrom: string;
  workingTill: string;
}
