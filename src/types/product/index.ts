export interface IProduct {
  id: number;
  productPrice: number;
  restaurantID: number;
  productName: string;
  productPhoto: string | null;
  productComposition: string;
  productDescription: string;
  weight: string;
}

export interface IProductById extends IProduct {
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
