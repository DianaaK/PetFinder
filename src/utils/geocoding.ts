import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyDc73STuikhkkwHANveoiL3gfMIiMjASb4');

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
