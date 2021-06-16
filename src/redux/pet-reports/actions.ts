import { Dispatch } from 'redux';
import { PetReportStore } from './index';
import { Server } from '../../utils';
import { PetReportDTO } from '../types';

export interface IPetReportActions {
  getPetReportAction(reportId: string): void;
  addPetReportAction(petReport: PetReportDTO): void;
  editPetReportAction(reportId: string, report: PetReportDTO): void;
  getPetReportListAction(): void;
  getUserReportListAction(userId: string): void;
  addFavoriteReportAction(
    userId: string,
    reportId: string,
    favorite: boolean
  ): void;
  getFavoriteReportsAction(userId: string): void;
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
            payload: response.data as PetReportDTO
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

  editPetReportAction(reportId: string, report: PetReportDTO) {
    return async (dispatch: Dispatch<any>) => {
      dispatch({
        type: PetReportStore.ActionTypes.EDIT_REPORT
      });
      await Server.put(`pet-reports/${reportId}`, report)
        .then((response: any) => {
          dispatch({
            type: PetReportStore.ActionTypes.EDIT_REPORT_SUCCESS,
            payload: response.data as PetReportDTO
          });
        })
        .catch((error) => {
          dispatch({
            type: PetReportStore.ActionTypes.EDIT_REPORT_FAILED,
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
      await Server.get('pet-reports')
        .then((response: any) => {
          dispatch({
            type: PetReportStore.ActionTypes.GET_REPORT_LIST_SUCCESS,
            payload: response.data as PetReportDTO[]
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

  getUserReportListAction(userId: string) {
    return async (dispatch: Dispatch<any>) => {
      dispatch({
        type: PetReportStore.ActionTypes.GET_USER_REPORT_LIST
      });
      await Server.get(`pet-reports/user/${userId}`)
        .then((response: any) => {
          dispatch({
            type: PetReportStore.ActionTypes.GET_USER_REPORT_LIST_SUCCESS,
            payload: response.data as PetReportDTO[]
          });
        })
        .catch((error) => {
          dispatch({
            type: PetReportStore.ActionTypes.GET_USER_REPORT_LIST_FAILED,
            payload: Server.errorParse(error)
          });
        });
    };
  }

  addFavoriteReportAction(userId: string, reportId: string, favorite: boolean) {
    return async (dispatch: Dispatch<any>) => {
      dispatch({
        type: PetReportStore.ActionTypes.ADD_FAVORITE_REPORT
      });
      await Server.post(`pet-reports/${userId}/favorite`, {
        reportId,
        favorite
      })
        .then((response: any) => {
          dispatch({
            type: PetReportStore.ActionTypes.ADD_FAVORITE_REPORT_SUCCESS,
            payload: response.data as PetReportDTO
          });
        })
        .catch((error) => {
          dispatch({
            type: PetReportStore.ActionTypes.ADD_FAVORITE_REPORT_FAILED,
            payload: Server.errorParse(error)
          });
        });
    };
  }

  getFavoriteReportsAction(userId: string) {
    return async (dispatch: Dispatch<any>) => {
      dispatch({
        type: PetReportStore.ActionTypes.GET_FAVORITE_REPORTS
      });
      await Server.get(`pet-reports/${userId}/favorites`)
        .then((response: any) => {
          dispatch({
            type: PetReportStore.ActionTypes.GET_FAVORITE_REPORTS_SUCCESS,
            payload: response.data as PetReportDTO[]
          });
        })
        .catch((error) => {
          dispatch({
            type: PetReportStore.ActionTypes.GET_FAVORITE_REPORTS_FAILED,
            payload: Server.errorParse(error)
          });
        });
    };
  }
}

const petReportActions = new PetReportActions();
export default petReportActions;
