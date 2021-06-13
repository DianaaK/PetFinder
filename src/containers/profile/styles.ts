import { StyleSheet } from 'react-native';
import { colors, navbarStyles } from '../../styles';

export const styles = StyleSheet.create({
  container: {
    paddingTop: navbarStyles.paddingTop,
    flex: 1,
    backgroundColor: colors.mainColor
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
