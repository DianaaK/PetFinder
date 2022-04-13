import Geocoder from 'react-native-geocoding';
import { GEOCODER_KEY } from '@env';

Geocoder.init(GEOCODER_KEY);

export const getCoordinatesFromAddress = async (address: string) => {
  return Geocoder.from(address)
    .then((json) => {
      const location = json.results[0];
      return location;
    })
    .catch((error) => console.warn(error));
};

export const getAddressFromCoordinates = async (
  latitude: number,
  longitude: number
) => {
  return Geocoder.from(latitude, longitude)
    .then((json) => {
      const location = json.results[0];
      return location;
    })
    .catch((error) => console.warn(error));
};
