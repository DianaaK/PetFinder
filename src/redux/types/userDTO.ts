export class UserDTO {
  _id: string = '';
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  phone?: string | null;
  password?: string;
}
