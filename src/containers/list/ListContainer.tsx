import { useNavigation, useRoute } from '@react-navigation/core';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  View,
  FlatList,
  Keyboard,
  BackHandler,
  ActivityIndicator
} from 'react-native';
import { AppStore } from '../../redux';
import petReportActions from '../../redux/pet-reports/actions';
import reduxContainer from '../../redux/reduxContainer';
import { ListType, PetGender, PetSpecies, ReportType } from '../../redux/types';
import { colors } from '../../styles';
import { requestLocationPermission } from '../../utils';
import { HeaderComponent } from '../general';
import {
  ListItemComponent,
  SearchComponent,
  EmptyComponent
} from './components';
import { styles } from './styles';

function ListContainer(props: any) {
  const route: any = useRoute();
  const navigation = useNavigation();
  const listType = route.params?.listType;
  const forUser = listType === ListType.USER;
  const forFavorites = listType === ListType.FAVORITES;
  const forGeneral = listType === ListType.GENERAL;

  useEffect(() => {
    if (!listType?.toString()) {
      props.getPetReportListAction();
    }
  }, []);

  useEffect(() => {
    if (forUser && props.user) {
      props.getUserReportListAction(props.user._id);
    } else if (forFavorites && props.user) {
      props.getFavoriteReportsAction(props.user._id);
    } else if (forGeneral) {
      props.getPetReportListAction();
    }
  }, [listType]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  const renderItem = ({ item }: { item: any }) => {
    return (
      <ListItemComponent key={item._id} item={item} onPress={onPressItem} />
    );
  };

  const onMenuOpen = () => {
    Keyboard.dismiss();
    props.navigation.openDrawer();
  };

  const onMapOpen = async () => {
    await requestLocationPermission();
    navigation.navigate('GeneralMap');
  };

  const onPressItem = (_id: string) => {
    navigation.navigate('Details', { itemId: _id, canNavigate: true });
  };

  return (
    <View style={styles.container}>
      <HeaderComponent
        title={
          forUser
            ? 'My Reports'
            : forFavorites
            ? 'My Favorites'
            : 'Lost & Found'
        }
        leftButtonAction={onMenuOpen}
        leftButtonIcon={{
          type: 'MaterialIcons',
          name: 'menu'
        }}
        rightButtonAction={
          forGeneral || !listType?.toString() ? onMapOpen : undefined
        }
        rightButtonIcon={
          forGeneral || !listType?.toString()
            ? {
                type: 'FontAwesome',
                name: 'globe'
              }
            : undefined
        }
      />
      <View style={styles.contentContainer}>
        {props.get_report_list_pending ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.mainColorLight} />
          </View>
        ) : (
          <FlatList
            ListHeaderComponent={<SearchComponent />}
            ListEmptyComponent={<EmptyComponent />}
            data={
              forUser
                ? props.user_report_list
                : forFavorites
                ? props.favorite_reports
                : props.report_list
            }
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>
    </View>
  );
}

function mapStateToProps(state: AppStore.states) {
  return {
    user: state.user.user,
    report_list: state.petReports.report_list,
    get_report_list_pending: state.petReports.get_report_list_pending,
    user_report_list: state.petReports.user_report_list,
    get_user_report_list_pending: state.petReports.get_user_report_list_pending,
    favorite_reports: state.petReports.favorite_reports,
    get_favorite_reports_pending: state.petReports.get_favorite_reports_pending
  };
}

const dispatchToProps = {
  getPetReportListAction: petReportActions.getPetReportListAction,
  getUserReportListAction: petReportActions.getUserReportListAction,
  getFavoriteReportsAction: petReportActions.getFavoriteReportsAction
};

export default reduxContainer(ListContainer, mapStateToProps, dispatchToProps);

export const petLocationsList = [
  {
    _id: '1',
    petId: '1',
    user: 'Marius',
    date: '04.06.2021',
    address: 'Strada Aviator Serban Petrescu nr. 24',
    coordinates: {
      latitude: 44.46321,
      longitude: 26.09433
    }
  },
  {
    _id: '2',
    petId: '1',
    user: 'Ana',
    date: '01.06.2021',
    address: 'Str. Aviator Popa Marin',
    coordinates: {
      latitude: 44.46491,
      longitude: 26.09533
    }
  },
  {
    _id: '3',
    petId: '1',
    user: 'Sasha',
    date: '28.05.2021',
    address: 'Iuliu Tetrat 5',
    coordinates: {
      latitude: 44.46591,
      longitude: 26.09333
    }
  }
];
