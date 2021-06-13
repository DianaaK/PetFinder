import React, { useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import reduxContainer from '../../redux/reduxContainer';
import { MenuButtonComponent, TextComponent } from '../general';
import { assets } from '../../../assets/images';
import { styles } from './styles';
import authActions from '../../redux/authentication/actions';
import { AppStore } from '../../redux';

function ProfileContainer(props: any) {
  useEffect(() => {
    if (!props.user && !props.logout_pending && !props.logout_error) {
      props.navigation.navigate('LogIn');
    }
  }, [props.user]);

  const chooseAvatarHandler = () => {};

  const redirectToListAction = () => {
    props.navigation.closeDrawer();
    props.navigation.navigate('List', { forUser: false, forFavorites: false });
  };

  const logOutAction = () => {
    props.navigation.closeDrawer();
    props.logoutAction();
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
      {props.user && (
        <View style={styles.userDetails}>
          <View style={styles.flexRowContainer}>
            <TouchableOpacity
              style={styles.profileImageContainer}
              onPress={chooseAvatarHandler}>
              {props.user.profileImage ? (
                <Image
                  source={{ uri: props.user.profileImage || '' }}
                  style={styles.image}
                />
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
                {props.user.firstname + ' ' + props.user.lastname}
              </TextComponent>
              <TextComponent style={[styles.fadedText, { fontSize: 10 }]}>
                Member since: {props.user.created}
              </TextComponent>
            </View>
          </View>
          <TextComponent style={styles.fadedText}>
            {props.user.email}
          </TextComponent>
        </View>
      )}
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

function mapStateToProps(state: AppStore.states) {
  return {
    user: state.auth.user,
    logout_pending: state.auth.logout_pending,
    logout_error: state.auth.logout_error
  };
}

const dispatchToProps = {
  logoutAction: authActions.logoutAction
};

export default reduxContainer(
  ProfileContainer,
  mapStateToProps,
  dispatchToProps
);
