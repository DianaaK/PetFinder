export class UserDTO {
  _id: string = '';
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  phone?: string | null;
  password?: string;
  profileImage?: string;
  created?: string;
  useGoogleMaps?: boolean;
  useSatelliteView?: boolean;
}

export class RegisterUserDTO {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
}

export enum ListType {
  GENERAL,
  USER,
  FAVORITES
}
