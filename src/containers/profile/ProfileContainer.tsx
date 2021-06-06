import React from 'react';
import { View, StatusBar, TouchableOpacity, Image } from 'react-native';
import reduxContainer from '../../redux/reduxContainer';
import { MenuButtonComponent, TextComponent } from '../general';
import { assets } from '../../../assets/images';
import { styles } from './styles';
import { colors } from '../../styles';

function ProfileContainer(props: any) {
  const chooseAvatarHandler = () => {};

  const redirectToListAction = () => {
    props.navigation.closeDrawer();
    props.navigation.navigate('List', { forUser: false, forFavorites: false });
  };

  const logOutAction = () => {
    props.navigation.closeDrawer();
    props.navigation.navigate('LogIn');
  };

  const redirectToAddAction = () => {
    props.navigation.closeDrawer();
    props.navigation.navigate('Add');
  };

  const redirectToMyReports = () => {
    props.navigation.closeDrawer();
    props.navigation.navigate('List', { forUser: true, forFavorites: false });
  };

  const redirectToFavorites = () => {
    props.navigation.closeDrawer();
    props.navigation.navigate('List', { forUser: false, forFavorites: true });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.mainColor}
        barStyle="light-content"
        translucent
      />
      <View style={styles.userDetails}>
        <View style={styles.flexRowContainer}>
          <TouchableOpacity
            style={styles.profileImageContainer}
            onPress={chooseAvatarHandler}>
            {user.image ? (
              <Image source={{ uri: user.image || '' }} style={styles.image} />
            ) : (
              <Image
                source={assets.placeholder}
                style={styles.image}
                resizeMode="cover"
              />
            )}
          </TouchableOpacity>
          <View style={styles.details}>
            <TextComponent style={styles.text}>
              {user.firstname + ' ' + user.lastname}
            </TextComponent>
            <TextComponent style={[styles.fadedText, { fontSize: 10 }]}>
              Member since: {user.created}
            </TextComponent>
          </View>
        </View>
        <TextComponent style={styles.fadedText}>{user.email}</TextComponent>
      </View>
      <View style={styles.menu}>
        <MenuButtonComponent
          title="Lost & Found"
          iconType="MaterialIcons"
          iconName="pets"
          onPress={redirectToListAction}
        />
        <MenuButtonComponent
          title="Add pet"
          iconType="FontAwesome"
          iconName="plus"
          onPress={redirectToAddAction}
        />
        <MenuButtonComponent
          title="My reports"
          iconType="MaterialIcons"
          iconName="my-library-books"
          onPress={redirectToMyReports}
        />
        <MenuButtonComponent
          title="My Favorites"
          iconType="FontAwesome"
          iconName="heart"
          onPress={redirectToFavorites}
        />
      </View>
      <View style={styles.bottomMenu}>
        <MenuButtonComponent
          title="Settings"
          iconType="MaterialIcons"
          iconName="settings"
          onPress={() => {}}
        />
        <MenuButtonComponent
          title="Log out"
          iconType="MaterialIcons"
          iconName="logout"
          onPress={logOutAction}
        />
      </View>
    </View>
  );
}

function mapStateToProps(state: any) {
  return {};
}

const dispatchToProps = {};

export default reduxContainer(
  ProfileContainer,
  mapStateToProps,
  dispatchToProps
);

const user = {
  lastname: 'Tugui',
  firstname: 'Diana',
  email: 'dianaa.ecaterina@gmail.com',
  created: '25.05.2021',
  image:
    'https://scontent.fotp3-3.fna.fbcdn.net/v/t1.6435-9/129327920_3547153388686153_6776261588378670382_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeHv_BdGlJ86z24HlquSHRPjGooxbLSMJFEaijFstIwkUYF4vW7IBTFqi4a2XzvM4fIVJMjWH8nYXLmYWJ-K3Bd2&_nc_ohc=NNHDu_3omGMAX-k4lw9&_nc_ht=scontent.fotp3-3.fna&oh=b91ddf5f233c1354105f9ce4a17b65f9&oe=60D79BDA'
};
