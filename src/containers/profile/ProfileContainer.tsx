import React, { useEffect } from 'react';
import { View } from 'react-native';
import reduxContainer from '../../redux/reduxContainer';
import { MenuButtonComponent } from '../general';
import { styles } from './styles';
import authActions from '../../redux/authentication/actions';
import { AppStore } from '../../redux';
import ProfileSectionComponent from './components/ProfileSectionComponent';
import userActions from '../../redux/users/actions';

function ProfileContainer(props: any) {
  useEffect(() => {
    if (!props.user || props.user._id !== props.auth_user._id) {
      props.getUserAction(props.auth_user._id);
    }
  }, []);

  useEffect(() => {
    if (!props.auth_user && !props.logout_pending && !props.logout_error) {
      props.navigation.navigate('LogIn');
    }
  }, [props.auth_user]);

  const editUser = (newUser: any) => {
    props.editUserAction(props.user._id, newUser);
  };

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
        <ProfileSectionComponent user={props.user} editUser={editUser} />
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
    user: state.user.user,
    auth_user: state.auth.auth_user,
    logout_pending: state.auth.logout_pending,
    logout_error: state.auth.logout_error
  };
}

const dispatchToProps = {
  getUserAction: userActions.getUserAction,
  editUserAction: userActions.editUserAction,
  logoutAction: authActions.logoutAction
};

export default reduxContainer(
  ProfileContainer,
  mapStateToProps,
  dispatchToProps
);
