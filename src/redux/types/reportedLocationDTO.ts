import { CoordinatesDTO } from './petReportDTO';

export class ReportedLocationDTO {
  _id: string = '';
  petId: string = '';
  user: any = '';
  created?: string = '';
  address: string = '';
  coordinates: CoordinatesDTO = new CoordinatesDTO();
}
