export class PetReportDTO {
  _id: string = '';
  type: ReportType | null = null;
  name: string = '';
  species: PetSpecies | null = null;
  gender: PetGender | null = null;
  breed: string = '';
  age: string = '';
  description: string = '';
  date: string = '';
  media: string[] = [];
  user: ReportUserDTO = new ReportUserDTO();
  location?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  } = {
    latitude: 0,
    longitude: 0
  };
  isFavorite?: boolean;
}

export class ReportUserDTO {
  firstname: string = '';
  image?: string;
  phone?: string;
  email?: string;
}

export enum ReportType {
  LOST,
  FOUND
}

export enum PetSpecies {
  CAT,
  DOG,
  OTHER
}

export enum PetGender {
  MALE,
  FEMALE
}
