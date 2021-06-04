import { PermissionsAndroid } from 'react-native';

export async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    return granted;
  } catch (err) {
    console.warn(err);
  }
}
