import { StyleSheet } from 'react-native';
import { colors, statusBarHeight, DEVICE_WIDTH } from '../../styles';

export const styles = StyleSheet.create({
  container: {
    paddingTop: statusBarHeight * 2,
    flex: 1,
    backgroundColor: colors.mainColor
  },
  userDetails: {
    flexDirection: 'column',
    flex: 2,
    justifyContent: 'space-evenly',
    marginHorizontal: 20,
    borderBottomColor: colors.mainColor3,
    borderBottomWidth: 1
  },
  flexRowContainer: {
    flexDirection: 'row'
  },
  profileImageContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    height: 90,
    width: 90,
    marginRight: DEVICE_WIDTH / 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.mainColor2
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 50
  },
  details: {
    width: '65%',
    paddingRight: 5,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    color: colors.mainColorLight
  },
  fadedText: {
    marginTop: 10,
    fontSize: 14,
    color: colors.mainColor4
  },
  menu: {
    flex: 4,
    justifyContent: 'center',
    marginLeft: 20
  },
  bottomMenu: {
    margin: 20,
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  }
});
