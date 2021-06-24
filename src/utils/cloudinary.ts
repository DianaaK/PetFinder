import Toast from 'react-native-toast-message';

export const cloudinaryUpload = async (photo: any) => {
  const data = new FormData();
  data.append('file', photo);
  data.append('upload_preset', 'petfinder');
  data.append('cloud_name', 'dktt1998');
  return fetch('https://api.cloudinary.com/v1_1/dktt1998/upload', {
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
