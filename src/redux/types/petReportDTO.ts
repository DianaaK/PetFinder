export class PetReportDTO {
  _id?: string;
  name: string = '';
  description: string = '';
  type: ReportType | null = null;
  species: PetSpecies | null = null;
  gender: PetGender | null = null;
  breed: string = '';
  age: string = '';
  media: string[] = [];
  user?: ReportUserDTO | string;
  phoneContact?: boolean;
  emailContact?: boolean;
  address?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  } = {
    latitude: 0,
    longitude: 0
  };
  created?: string;
  isFavorite?: boolean;
  status?: ReportStatus;
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

export enum ReportStatus {
  ACTIVE,
  INACTIVE
}
