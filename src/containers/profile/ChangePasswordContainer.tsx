import React from 'react';
import { View } from 'react-native';
import { HeaderComponent } from '../general';
import { UserDTO } from '../../redux/types';
import ChangePasswordComponent from './components/ChangePasswordComponent';
import { AppStore, reduxContainer } from '../../redux';
import authActions from '../../redux/authentication/actions';

interface IProps {
  navigation: any;
  user: UserDTO;
  change_password_pending: boolean;
  change_password_error: string | null;
  changePasswordAction(
    username: string,
    oldPassword: string,
    newPassword: string
  ): void;
}

const ChangePasswordContainer = (props: IProps) => {
  const onBack = () => {
    props.navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent
        title="Change Password"
        leftButtonAction={onBack}
        leftButtonIcon={{
          type: 'MaterialIcons',
          name: 'arrow-back'
        }}
      />
      <ChangePasswordComponent
        userEmail={props.user.email}
        change_password_pending={props.change_password_pending}
        change_password_error={props.change_password_error}
        changePassword={props.changePasswordAction}
      />
    </View>
  );
};

function mapStateToProps(state: AppStore.states) {
  return {
    user: state.user.user,
    change_password_pending: state.auth.change_password_pending,
    change_password_error: state.auth.change_password_error
  };
}

const dispatchToProps = {
  changePasswordAction: authActions.changePasswordAction
};

export default reduxContainer(
  ChangePasswordContainer,
  mapStateToProps,
  dispatchToProps
);
