import React from 'react';
import { View } from 'react-native';
import { AppStore, reduxContainer } from '../../redux';
import petReportActions from '../../redux/pet-reports/actions';
import { HeaderComponent } from '../general';
import { AddPetFormComponent } from './components';

function AddPetContainer(props: any) {
  const onBack = () => {
    props.navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent
        title="Add Pet Report"
        leftButtonAction={onBack}
        leftButtonIcon={{
          type: 'MaterialIcons',
          name: 'arrow-back'
        }}
      />
      <AddPetFormComponent
        user={props.user}
        addPetReportAction={props.addPetReportAction}
      />
    </View>
  );
}

function mapStateToProps(state: AppStore.states) {
  return {
    user: state.user.user
  };
}

const dispatchToProps = {
  addPetReportAction: petReportActions.addPetReportAction
};

export default reduxContainer(
  AddPetContainer,
  mapStateToProps,
  dispatchToProps
);
