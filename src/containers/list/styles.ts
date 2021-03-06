import { StyleSheet } from 'react-native';
import { colors } from '../../styles';
import { statusBarHeight, maxHeightScreenWithNavbar } from '../../styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.lightGray,
    zIndex: 2,
    flex: 1,
    maxHeight: maxHeightScreenWithNavbar + 5
  },
  list: {
    flexGrow: 1,
    paddingBottom: 10
  },
  loadingContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    zIndex: 3
  }
});
