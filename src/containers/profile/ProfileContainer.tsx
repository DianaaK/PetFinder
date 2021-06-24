import React, { useEffect } from 'react';
import { View } from 'react-native';
import { MenuButtonComponent } from '../general';
import ProfileSectionComponent from './components/ProfileSectionComponent';
import { styles } from './styles';
import { AppStore } from '../../redux';
import reduxContainer from '../../redux/reduxContainer';
import userActions from '../../redux/users/actions';
import authActions from '../../redux/authentication/actions';
import { ListType, UserDTO } from '../../redux/types';

interface IProps {
  navigation: any;
  user: UserDTO;
  auth_user: UserDTO;
  logout_pending: boolean;
  logout_error: string | null;
  getUserAction(userId: string): void;
  editUserAction(userId: string, newUser: any): void;
  logoutAction(): void;
}

const ProfileContainer = (props: IProps) => {
  useEffect(() => {
    if (props.auth_user?._id && !props.user) {
      props.getUserAction(props.auth_user?._id);
    }
  }, [props.getUserAction]);

  useEffect(() => {
    if (!props.auth_user && !props.logout_pending && !props.logout_error) {
      props.navigation.navigate('LogIn');
    }
    if (props.auth_user?._id && props.user?._id !== props.auth_user?._id) {
      props.getUserAction(props.auth_user?._id);
    }
  }, [props.auth_user]);

  const editUser = (newUser: any) => {
    props.editUserAction(props.user._id, newUser);
  };

  const logOutAction = () => {
    props.navigation.closeDrawer();
    props.logoutAction();
  };

  const redirect = (screen: string, params?: any) => {
    props.navigation.closeDrawer();
    if (params) {
      props.navigation.navigate(screen, params);
    }
    props.navigation.navigate(screen);
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
          onPress={() => {
            redirect('List', { listType: ListType.GENERAL });
          }}
        />
        <MenuButtonComponent
          title="Add pet report"
          iconType="FontAwesome"
          iconName="plus"
          onPress={() => {
            redirect('Add', { editMode: false });
          }}
        />
        <MenuButtonComponent
          title="My reports"
          iconType="MaterialIcons"
          iconName="my-library-books"
          onPress={() => {
            redirect('List', { listType: ListType.USER });
          }}
        />
        <MenuButtonComponent
          title="My Favorites"
          iconType="FontAwesome"
          iconName="heart"
          onPress={() => {
            redirect('List', { listType: ListType.FAVORITES });
          }}
        />
      </View>
      <View style={styles.bottomMenu}>
        <MenuButtonComponent
          title="Settings"
          iconType="MaterialIcons"
          iconName="settings"
          onPress={() => {
            redirect('Settings');
          }}
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
};

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
