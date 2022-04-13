import Toast from 'react-native-toast-message';
import { CLOUDINARY_URL, CLOUDINARY_NAME } from '@env';

export const cloudinaryUpload = async (photo: any) => {
  const data = new FormData();
  data.append('file', photo);
  data.append('upload_preset', 'petfinder');
  data.append('cloud_name', CLOUDINARY_NAME);
  return fetch(CLOUDINARY_URL, {
    method: 'post',
    body: data
  })
    .then((res) => res.json())
    .catch(() => {
      Toast.show({
        type: 'error',
        text1: 'Due to an error, we could not upload your image!',
        visibilityTime: 1000
      });
      return null;
    });
};
