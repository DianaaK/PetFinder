import React from 'react';
import { View } from 'react-native';
import { HeaderComponent } from '../general';
import UserFormComponent from './components/UserFormComponent';
import { AppStore, reduxContainer } from '../../redux';
import { UserDTO } from '../../redux/types';
import userActions from '../../redux/users/actions';

interface IProps {
  navigation: any;
  user: UserDTO;
  editUserAction(userId: string, user: UserDTO): void;
}

const UserContainer = (props: IProps) => {
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
        <UserFormComponent user={props.user} editUser={props.editUserAction} />
      ) : null}
    </View>
  );
};

function mapStateToProps(state: AppStore.states) {
  return {
    user: state.user.user
  };
}

const dispatchToProps = {
  editUserAction: userActions.editUserAction
};

export default reduxContainer(UserContainer, mapStateToProps, dispatchToProps);
