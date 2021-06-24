import { useNavigation, useRoute } from '@react-navigation/core';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
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
import { ListType, PetReportDTO, UserDTO } from '../../redux/types';
import { colors } from '../../styles';
import { requestLocationPermission } from '../../utils';
import { HeaderComponent } from '../general';
import {
  ListItemComponent,
  SearchComponent,
  EmptyComponent
} from './components';
import { styles } from './styles';

interface IProps {
  navigation: any;
  user: UserDTO;
  report_list: PetReportDTO[];
  user_report_list: PetReportDTO[];
  favorite_reports: PetReportDTO[];
  get_report_list_pending: boolean;
  get_user_report_list_pending: boolean;
  get_favorite_reports_pending: boolean;
  getPetReportListAction(criteria?: any): void;
  getUserReportListAction(userId: string, criteria?: any): void;
  getFavoriteReportsAction(userId: string, criteria?: any): void;
}

const ListContainer = (props: IProps) => {
  const route: any = useRoute();
  const navigation = useNavigation();

  const [initialFilters, setInitialFilters] = useState<any>(
    route.params?.filters || {}
  );
  const [initialSearch, setInitialSearch] = useState('');

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
    setInitialFilters({});
    setInitialSearch('');
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
    navigation.navigate('GeneralMap', { filters: initialFilters });
  };

  const onPressItem = (reportId: string) => {
    navigation.navigate('Details', { itemId: reportId, canNavigate: true });
  };

  const saveQuery = (search: string, filters: any) => {
    setInitialSearch(search);
    setInitialFilters(filters);
    if (forUser && props.user) {
      props.getUserReportListAction(props.user._id, { search, filters });
    } else if (forFavorites && props.user) {
      props.getFavoriteReportsAction(props.user._id, { search, filters });
    } else if (forGeneral || !listType?.toString()) {
      props.getPetReportListAction({ search, filters });
    }
  };

  const isPending =
    props.get_report_list_pending ||
    props.get_user_report_list_pending ||
    props.get_favorite_reports_pending;
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
        {isPending && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.mainColor5} />
          </View>
        )}
        <FlatList
          ListHeaderComponent={
            <SearchComponent
              initialSearch={initialSearch}
              initialFilters={initialFilters}
              saveQuery={saveQuery}
            />
          }
          ListEmptyComponent={!isPending ? <EmptyComponent /> : null}
          data={
            forUser
              ? props.user_report_list
              : forFavorites
              ? props.favorite_reports
              : props.report_list
          }
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          keyExtractor={(item) => item._id || ''}
        />
      </View>
    </View>
  );
};

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
