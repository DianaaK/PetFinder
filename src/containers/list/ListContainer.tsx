import { useNavigation, useRoute } from '@react-navigation/core';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { View, StatusBar, FlatList, Keyboard, BackHandler } from 'react-native';
import reduxContainer from '../../redux/reduxContainer';
import { PetGender, PetSpecies, ReportType } from '../../redux/types';
import { requestLocationPermission } from '../../utils';
import { HeaderComponent } from '../general';
import { ListItemComponent, SearchComponent } from './components';
import { styles } from './styles';

function ListContainer(props: any) {
  const route: any = useRoute();
  const navigation = useNavigation();
  const forUser = route.params?.forUser;
  const forFavorites = route.params?.forFavorites;

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
    navigation.navigate('GeneralMap', { viewMode: true });
  };

  const onPressItem = (_id: string) => {
    navigation.navigate('Details', { itemId: _id, canNavigate: true });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
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
        rightButtonAction={onMapOpen}
        rightButtonIcon={{
          type: 'FontAwesome',
          name: 'globe'
        }}
      />
      <View style={styles.contentContainer}>
        <FlatList
          ListHeaderComponent={<SearchComponent />}
          data={forUser ? userReports : forFavorites ? forFavoritesList : data}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
}

function mapStateToProps(state: any) {
  return {
    currentScene: state.scene.scene
  };
}

const dispatchToProps = {};

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

export const data = [
  {
    _id: '1',
    type: ReportType.LOST,
    name: 'Ari',
    species: PetSpecies.CAT,
    gender: PetGender.MALE,
    breed: 'Birman',
    age: '2 years',
    description:
      'Ari is a 2 year old cat who has been living with our family since he was a kitten. He has always been indoors so he doesnt know how to survive on his own outside. He has been missing for 48 hours already so we are really scared he will not come home on his own',
    date: '28.05.2021',
    user: {
      firstname: 'Diana',
      image:
        'https://scontent.fotp3-3.fna.fbcdn.net/v/t1.6435-9/129327920_3547153388686153_6776261588378670382_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeHv_BdGlJ86z24HlquSHRPjGooxbLSMJFEaijFstIwkUYF4vW7IBTFqi4a2XzvM4fIVJMjWH8nYXLmYWJ-K3Bd2&_nc_ohc=NNHDu_3omGMAX-k4lw9&_nc_ht=scontent.fotp3-3.fna&oh=b91ddf5f233c1354105f9ce4a17b65f9&oe=60D79BDA',
      phone: '0732783868'
    },
    media: [
      'https://i.gyazo.com/3053eb843600495227af715c1b393436.jpg',
      'https://i.gyazo.com/ce34286ae3eea1f5d456c32b691f86d0.png',
      'https://i.gyazo.com/f1341cf039299615d2792cb36d79bb52.jpg'
    ],
    location: 'Bucharest',
    distance: '1.2 Km',
    coordinates: {
      latitude: 44.46291,
      longitude: 26.09333
    }
  },
  {
    _id: '2',
    type: ReportType.FOUND,
    name: 'Suki',
    species: PetSpecies.CAT,
    breed: 'Common breed',
    gender: PetGender.FEMALE,
    age: '6 years',
    description:
      'Ut erat metus, scelerisque tristique porttitor in, volutpat sed quam. Donec lorem nulla, sollicitudin in sagittis non, semper _id nunc. Ut erat metus, scelerisque tristique porttitor in, volutpat sed quam. Donec lorem nulla, sollicitudin in sagittis non, semper _id nunc. Ut erat metus, scelerisque tristique porttitor in, volutpat sed quam. Donec lorem nulla, sollicitudin in sagittis non, semper _id nunc.',
    date: '15.04.2021',
    user: {
      firstname: 'Marius',
      image:
        'https://az617363.vo.msecnd.net/imgmodels/models/MD30001218/dbw_9048.jpg?width=500&height=500&iframe=true',
      phone: '0722869594',
      email: 'marius_12@gmail.com'
    },
    media: [
      'https://c.files.bbci.co.uk/12A9B/production/_111434467_gettyimages-1143489763.jpg',
      'https://www.thesprucepets.com/thmb/kwGfWsJ_HgbqSw9fRmQIhdLpCa4=/1553x1553/smart/filters:no_upscale()/bengalcat-56a2bcd95f9b58b7d0cdf798.jpg'
    ],

    location: 'Bucharest',
    distance: '0.2 Km',
    coordinates: {
      latitude: 44.45291,
      longitude: 26.11333
    }
  },
  {
    _id: '3',
    type: ReportType.FOUND,
    name: 'Orange kitten that looks lost',
    species: PetSpecies.CAT,
    breed: 'Common breed',
    gender: PetGender.MALE,
    age: '3 months',
    description: 'Orange kitten',
    date: '10.04.2021',
    user: {
      firstname: 'Ana',
      email: 'mail@gmail.com'
    },
    media: [
      'https://media1.popsugar-assets.com/files/thumbor/1TCL1Ddne0jKYDztzjA-8K5RjF4/fit-in/728xorig/filters:format_auto-!!-:strip_icc-!!-/2020/03/31/067/n/1922243/tmp_dsoLCh_f9da2c804d46c59b_IMG_2098.jpeg'
    ],
    location: 'Bucharest',
    distance: '2.3 Km',
    coordinates: {
      latitude: 44.42223,
      longitude: 26.15289
    }
  },
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
    }
  }
];

export const userReports = [
  {
    _id: '1',
    type: ReportType.LOST,
    name: 'Ari',
    species: PetSpecies.CAT,
    gender: PetGender.MALE,
    breed: 'Birman',
    age: '2 years',
    description:
      'Ari is a 2 year old cat who has been living with our family since he was a kitten. He has always been indoors so he doesnt know how to survive on his own outside. He has been missing for 48 hours already so we are really scared he will not come home on his own',
    date: '28.05.2021',
    user: {
      firstname: 'Diana',
      image:
        'https://scontent.fotp3-3.fna.fbcdn.net/v/t1.6435-9/129327920_3547153388686153_6776261588378670382_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeHv_BdGlJ86z24HlquSHRPjGooxbLSMJFEaijFstIwkUYF4vW7IBTFqi4a2XzvM4fIVJMjWH8nYXLmYWJ-K3Bd2&_nc_ohc=NNHDu_3omGMAX-k4lw9&_nc_ht=scontent.fotp3-3.fna&oh=b91ddf5f233c1354105f9ce4a17b65f9&oe=60D79BDA',
      phone: '0732783868'
    },
    media: [
      'https://www.petbarn.com.au/petspot/app/uploads/2011/09/PB387_Blog-Genral-In-Post-800x533px.jpg',
      'https://thepedigreepaws.b-cdn.net/web/kitten_breed/3/1594236709-birman-unusual-markings-cat-breed.jpg',
      'https://media.istockphoto.com/photos/sacred-birma-cat-in-interior-picture-id623368372?k=6&m=623368372&s=170667a&w=0&h=qPgfMb-SC5l0u3gXaRHu-K5uZylLeE-MtMzG6y3Oc60='
    ],
    location: 'Bucharest',
    distance: '1.2 Km',
    coordinates: {
      latitude: 44.46291,
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
    }
  }
];
