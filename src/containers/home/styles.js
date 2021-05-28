import { StyleSheet } from 'react-native';
import { colors } from '../../styles';
import { statusBarHeight, maxHeightScreenWithNavbar } from '../../styles';

export const styles = StyleSheet.create({
  container: {
    marginTop: statusBarHeight
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.lightGray
  },
  listContainer: {
    flex: 1,
    maxHeight: maxHeightScreenWithNavbar + 5
  },
  list: {
    flexGrow: 1,
    paddingBottom: 10
  }
});
