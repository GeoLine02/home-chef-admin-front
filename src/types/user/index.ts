export type IUserType = "user" | "admin" | "restaurant owner";

export interface IUserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface IUser extends IUserFormValues {
  id: number;
}
