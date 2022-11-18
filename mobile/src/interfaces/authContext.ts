import { Car } from "./car";

export interface AuthContextValues {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  cars: Car[];
  setCars: React.Dispatch<React.SetStateAction<Car[]>>;
}
