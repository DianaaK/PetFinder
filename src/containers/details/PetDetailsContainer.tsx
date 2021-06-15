import { useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AppStore, reduxContainer } from '../../redux';
import petReportActions from '../../redux/pet-reports/actions';
import {
  colors,
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  statusBarHeight
} from '../../styles';
import {
  PetCardComponent,
  PetDetailsComponent,
  PetHeaderComponent
} from './components';

function PetDetailsContainer(props: any) {
  const route: any = useRoute();

  useEffect(() => {
    const itemId = route.params.itemId;
    if (!props.report || props.report._id !== itemId) {
      props.getPetReportAction(itemId);
    }
  }, []);

  const isUserOwner = props.report?.user._id === props.user?._id;
  return (
    <View style={styles.container}>
      {props.get_report_pending || !props.report ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.mainColorLight} />
        </View>
      ) : (
        <ScrollView>
          <PetHeaderComponent
            item={props.report}
            canNavigate={route.params.canNavigate}
            isUserOwner={isUserOwner}
          />
          <View style={styles.detailsContainer}>
            <View style={styles.cardContainer}>
              <PetCardComponent item={props.report} />
            </View>
            <PetDetailsComponent
              item={props.report}
              canNavigate={route.params.canNavigate}
              isUserOwner={isUserOwner}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

function mapStateToProps(state: AppStore.states) {
  return {
    user: state.user.user,
    report: state.petReports.report,
    get_report_pending: state.petReports.get_report_pending
  };
}

const dispatchToProps = {
  getPetReportAction: petReportActions.getPetReportAction
};

export default reduxContainer(
  PetDetailsContainer,
  mapStateToProps,
  dispatchToProps
);

const styles = StyleSheet.create({
  container: {
    marginTop: statusBarHeight,
    flex: 1
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: '100%',
    minHeight: DEVICE_HEIGHT / 2 - statusBarHeight
  },
  cardContainer: {
    marginTop: -30,
    marginHorizontal: DEVICE_WIDTH / 14
  },
  loadingContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center'
  }
});
