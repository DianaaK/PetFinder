import { isAndroid } from './deviceHelper';

export const fonts = {
  mainFont: isAndroid ? 'Montserrat-Regular' : 'Montserrat',
  secondFont: 'Quicksand-Regular',
  montserratBold: 'Montserrat-Bold',
  montserratMedium: 'Montserrat-Medium',
  montserratSemiBold: 'Montserrat-SemiBold'
};
