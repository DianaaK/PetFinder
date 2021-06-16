import { StyleSheet } from 'react-native';
import { colors, DEVICE_WIDTH, fonts } from '../../../styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  description: {
    color: colors.mainColor4,
    lineHeight: 20,
    fontFamily: fonts.secondFont
  },
  username: {
    fontSize: 16,
    color: colors.mainColor2,
    fontFamily: fonts.mainFont
  },
  userType: {
    marginLeft: 38,
    fontSize: 13,
    color: colors.mainColor4,
    fontFamily: fonts.secondFont
  },
  date: {
    fontSize: 14,
    color: colors.mainColor2,
    fontFamily: fonts.mainFont
  },
  icon: {
    color: colors.mainColor5,
    paddingRight: 5,
    fontSize: 12
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 20,
    marginRight: 8
  },
  navigateContainer: {
    marginTop: 40,
    alignItems: 'center'
  },
  navigateText: {
    fontSize: 22,
    color: colors.mainColor2,
    textAlign: 'center'
  },
  navigateButton: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 12,
    marginTop: 10,
    backgroundColor: colors.mainColor3,
    borderRadius: 20
  },
  navigateButtonText: {
    fontSize: 22,
    color: 'white'
  },
  ownerSection: {
    marginTop: 25,
    paddingTop: 10,
    borderTopColor: colors.mainColor4,
    borderTopWidth: 1
  },
  ownerButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colors.lightGray,
    paddingVertical: 8,
    marginHorizontal: DEVICE_WIDTH / 18,
    marginBottom: 0,
    borderRadius: 20,
    borderWidth: 1
  },
  ownerButtonText: {
    fontSize: 18
  },
  buttonIcon: {
    paddingRight: 5,
    fontSize: 22,
    fontWeight: '700'
  }
});
