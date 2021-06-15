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
      props.getUserReportListAction(props.user._id);
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
                ? forFavoritesList
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
    get_user_report_list_pending: state.petReports.get_user_report_list_pending
  };
}

const dispatchToProps = {
  getPetReportListAction: petReportActions.getPetReportListAction,
  getUserReportListAction: petReportActions.getUserReportListAction
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

export const forFavoritesList = [
  {
    _id: '4',
    type: ReportType.LOST,
    name: 'Yuna',
    species: PetSpecies.DOG,
    breed: 'Husky',
    gender: PetGender.FEMALE,
    age: '4 years',
    description:
      'Vestibulum tempor fringilla placerat. Maecenas ipsum nibh, porta finibus tempus in, blandit non libero. Vivamus ac sapien nisl. Curabitur dui massa, efficitur sit amet aliquam vel, malesuada nec diam. Vestibulum et suscipit nunc, non pellentesque libero. Nulla sed ante vitae magna efficitur imperdiet. Praesent sed urna rutrum, sagittis dolor in, congue erat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam quis neque faucibus, fermentum nisi at, blandit dolor.',
    date: '1.03.2021',
    user: {
      firstname: 'Sasha',
      phone: '0765995115'
    },
    media: [
      'https://cdn.shopify.com/s/files/1/0994/0236/articles/siberian-husky_2319x.jpg?v=1502391918',
      'https://www.taramulanimalelor.com/wp-content/uploads/2019/12/Ce-trebuie-sa-stii-despre-Husky-Siberian.png'
    ],
    location: 'Bucharest',
    distance: '6 Km',
    coordinates: {
      latitude: 44.42851,
      longitude: 26.05298
    },
    isFavorite: true
  }
];
