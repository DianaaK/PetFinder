import { request, PERMISSIONS } from 'react-native-permissions';
import { isIOS } from '../styles';

export async function requestLocationPermission() {
  try {
    let granted;
    if (isIOS) {
      granted = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
    } else {
      granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
    return granted;
  } catch (err) {
    console.warn(err);
  }
}

export async function requestCameraPermission() {
  try {
    let granted;
    if (isIOS) {
      granted = await request(PERMISSIONS.IOS.CAMERA);
    } else {
      granted = await request(PERMISSIONS.ANDROID.CAMERA);
    }
    return granted;
  } catch (err) {
    console.warn(err);
  }
}
