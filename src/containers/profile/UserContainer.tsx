import React, { useEffect } from 'react';
import { View } from 'react-native';
import { HeaderComponent } from '../general';
import UserFormComponent from './components/UserFormComponent';
import { AppStore, reduxContainer } from '../../redux';
import { UserDTO } from '../../redux/types';
import userActions from '../../redux/users/actions';

interface IProps {
  navigation: any;
  user: UserDTO;
  edit_user_pending: boolean;
  edit_user_error: string | null;
  auth_user: UserDTO;
  getUserAction(userId: string): void;
  editUserAction(userId: string, user: UserDTO): void;
}

const UserContainer = (props: IProps) => {
  useEffect(() => {
    if (props.auth_user?._id && !props.user) {
      props.getUserAction(props.auth_user?._id);
    }
  }, [props.getUserAction]);

  const onBack = () => {
    props.navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent
        title="User Settings"
        leftButtonAction={onBack}
        leftButtonIcon={{
          type: 'MaterialIcons',
          name: 'arrow-back'
        }}
      />
      {props.user ? (
        <UserFormComponent
          user={props.user}
          edit_user_pending={props.edit_user_pending}
          edit_user_error={props.edit_user_error}
          editUser={props.editUserAction}
        />
      ) : null}
    </View>
  );
};

function mapStateToProps(state: AppStore.states) {
  return {
    user: state.user.user,
    edit_user_pending: state.user.edit_user_pending,
    edit_user_error: state.user.edit_user_error,
    auth_user: state.auth.auth_user
  };
}

const dispatchToProps = {
  editUserAction: userActions.editUserAction,
  getUserAction: userActions.getUserAction
};

export default reduxContainer(UserContainer, mapStateToProps, dispatchToProps);
