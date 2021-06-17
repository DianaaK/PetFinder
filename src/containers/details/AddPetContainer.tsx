import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { AppStore, reduxContainer } from '../../redux';
import petReportActions from '../../redux/pet-reports/actions';
import { PetReportDTO, UserDTO } from '../../redux/types';
import { HeaderComponent } from '../general';
import { AddPetFormComponent } from './components';

interface IProps {
  navigation: any;
  user: UserDTO;
  report: PetReportDTO | null;
  addPetReportAction(petReport: PetReportDTO): void;
  editPetReportAction(reportId: string, report: PetReportDTO): void;
}

const AddPetContainer = (props: IProps) => {
  const route: any = useRoute();
  const editMode = route.params.editMode;

  const onBack = () => {
    props.navigation.goBack();
  };

  const saveReport = (report: PetReportDTO) => {
    if (editMode && report?._id) {
      props.editPetReportAction(report._id, report);
    } else {
      props.addPetReportAction(report);
    }
  };

  const petReport =
    editMode && props.report ? props.report : new PetReportDTO();
  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent
        title={editMode ? 'Edit Pet Report' : 'Add Pet Report'}
        leftButtonAction={onBack}
        leftButtonIcon={{
          type: 'MaterialIcons',
          name: 'arrow-back'
        }}
      />
      <AddPetFormComponent
        user={props.user}
        editMode={editMode}
        petReport={petReport}
        saveReportAction={saveReport}
      />
    </View>
  );
};

function mapStateToProps(state: AppStore.states) {
  return {
    user: state.user.user,
    report: state.petReports.report
  };
}

const dispatchToProps = {
  addPetReportAction: petReportActions.addPetReportAction,
  editPetReportAction: petReportActions.editPetReportAction
};

export default reduxContainer(
  AddPetContainer,
  mapStateToProps,
  dispatchToProps
);
