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
