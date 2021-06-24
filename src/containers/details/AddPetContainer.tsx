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
  add_report_pending: boolean;
  add_report_error: string | null;
  edit_report_pending: boolean;
  edit_report_error: string | null;
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
        pending={
          editMode ? props.edit_report_pending : props.add_report_pending
        }
        error={editMode ? props.edit_report_error : props.add_report_error}
        saveReportAction={saveReport}
      />
    </View>
  );
};

function mapStateToProps(state: AppStore.states) {
  return {
    user: state.user.user,
    report: state.petReports.report,
    add_report_pending: state.petReports.add_report_pending,
    add_report_error: state.petReports.add_report_error,
    edit_report_pending: state.petReports.edit_report_pending,
    edit_report_error: state.petReports.edit_report_error
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
