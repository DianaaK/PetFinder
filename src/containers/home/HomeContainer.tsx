import React from 'react';
import { View, StatusBar, FlatList, Keyboard } from 'react-native';
import reduxContainer from '../../redux/reduxContainer';
import { Router } from '../../utils';
import { HeaderComponent, TextComponent } from '../general';
import { AnimalCardComponent, SearchComponent } from './components';
import { styles } from './styles';

function HomeContainer(props: any) {
  const renderItem = ({ item }: { item: any }) => {
    return <AnimalCardComponent key={item.id} item={item} />;
  };

  const onMenuOpen = () => {
    Keyboard.dismiss();
    props.navigation.openDrawer();
  };

  const onMapOpen = () => {};

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
      <HeaderComponent
        title="Lost & Found"
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
          data={data}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          keyExtractor={(item) => item.id}
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

export default reduxContainer(HomeContainer, mapStateToProps, dispatchToProps);

const data = [
  {
    id: '1',
    type: 'Found',
    name: 'Ari',
    species: 'Cat',
    breed: 'Birman',
    gender: 'male',
    age: '2 years',
    description: 'Fluffy cat with blue eyes',
    date: '28.05.2021',
    userName: 'Diana',
    userContact: '0732783868',
    media: [
      'https://www.petbarn.com.au/petspot/app/uploads/2011/09/PB387_Blog-Genral-In-Post-800x533px.jpg',
      ''
    ],
    location: 'Bucharest',
    distance: '1.2 Km'
  },
  {
    id: '2',
    type: 'Lost',
    name: 'Suki',
    species: 'Cat',
    breed: 'Common breed',
    gender: 'female',
    age: '6 years',
    description: 'Common cat with brown fur',
    date: '15.04.2021',
    userName: 'Marius',
    userContact: 'mail@gmail.com',
    media: [
      'https://c.files.bbci.co.uk/12A9B/production/_111434467_gettyimages-1143489763.jpg',
      ''
    ],

    location: 'Constanta',
    distance: '233.6 Km'
  },
  {
    id: '3',
    type: 'Found',
    name: 'Orange kitten that looks lost',
    species: 'Cat',
    breed: 'Common breed',
    gender: 'male',
    age: '3 months',
    description: 'Orange kitten',
    date: '10.04.2021',
    userName: 'Ana',
    userContact: 'mail@gmail.com',
    media: [
      'https://media1.popsugar-assets.com/files/thumbor/1TCL1Ddne0jKYDztzjA-8K5RjF4/fit-in/728xorig/filters:format_auto-!!-:strip_icc-!!-/2020/03/31/067/n/1922243/tmp_dsoLCh_f9da2c804d46c59b_IMG_2098.jpeg',
      ''
    ],
    location: 'Bucharest',
    distance: '2.3 Km'
  },
  {
    id: '4',
    type: 'Lost',
    name: 'Yuna',
    species: 'Dog',
    breed: 'Husky',
    gender: 'female',
    age: '4 years',
    description: 'Gray husky with blue eyes',
    date: '1.03.2021',
    userName: 'Sasha',
    userContact: 'mail2@gmail.com',
    media: [
      'https://cdn.shopify.com/s/files/1/0994/0236/articles/siberian-husky_2319x.jpg?v=1502391918',
      ''
    ],
    location: 'Bucharest',
    distance: '6 Km'
  }
];
