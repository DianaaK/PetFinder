import { Dispatch } from 'redux';
import { PetReportStore } from './index';
import { Server } from '../../utils';
import { PetReportDTO } from '../types';

export interface IPetReportActions {
  getPetReportAction(reportId: string): void;
  getPetReportListAction(): void;
  addPetReportAction(petReport: PetReportDTO): void;
}

class PetReportActions implements IPetReportActions {
  getPetReportAction(reportId: string) {
    return async (dispatch: Dispatch<any>) => {
      dispatch({
        type: PetReportStore.ActionTypes.GET_REPORT
      });
      await Server.get(`pet-reports/${reportId}`)
        .then((response: any) => {
          dispatch({
            type: PetReportStore.ActionTypes.GET_REPORT_SUCCESS,
            payload: response.data as any
          });
        })
        .catch((error) => {
          dispatch({
            type: PetReportStore.ActionTypes.GET_REPORT_FAILED,
            payload: Server.errorParse(error)
          });
        });
    };
  }

  getPetReportListAction() {
    return async (dispatch: Dispatch<any>) => {
      dispatch({
        type: PetReportStore.ActionTypes.GET_REPORT_LIST
      });
      await Server.get(`pet-reports`)
        .then((response: any) => {
          dispatch({
            type: PetReportStore.ActionTypes.GET_REPORT_LIST_SUCCESS,
            payload: response.data as any
          });
        })
        .catch((error) => {
          dispatch({
            type: PetReportStore.ActionTypes.GET_REPORT_LIST_FAILED,
            payload: Server.errorParse(error)
          });
        });
    };
  }

  addPetReportAction(petReport: PetReportDTO) {
    return async (dispatch: Dispatch<any>) => {
      dispatch({
        type: PetReportStore.ActionTypes.ADD_REPORT
      });
      await Server.post(`pet-reports/add`, petReport)
        .then((response: any) => {
          dispatch({
            type: PetReportStore.ActionTypes.ADD_REPORT_SUCCESS,
            payload: response.data as PetReportDTO
          });
        })
        .catch((error) => {
          dispatch({
            type: PetReportStore.ActionTypes.ADD_REPORT_FAILED,
            payload: Server.errorParse(error)
          });
        });
    };
  }
}

const petReportActions = new PetReportActions();
export default petReportActions;
