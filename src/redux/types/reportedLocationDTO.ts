export class ReportedLocationDTO {
  _id: string = '';
  petId: string = '';
  user: string = '';
  created?: string = '';
  address: string = '';
  coordinates: { latitude: number; longitude: number } = {
    latitude: 0,
    longitude: 0
  };
}
