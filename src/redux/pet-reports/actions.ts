import { Dispatch } from 'redux';
import { PetReportStore } from './index';
import { buildCriteria, Server } from '../../utils';
import { PetReportDTO } from '../types';

export interface IPetReportActions {
  getPetReportAction(reportId: string): void;
  addPetReportAction(petReport: PetReportDTO): void;
  editPetReportAction(reportId: string, report: PetReportDTO): void;
  getPetReportListAction(criteria?: any): void;
  getUserReportListAction(userId: string, criteria?: any): void;
  addFavoriteReportAction(
    userId: string,
    reportId: string,
    favorite: boolean
  ): void;
  getFavoriteReportsAction(userId: string, criteria?: any): void;
  deleteReportAction(reportId: string): void;
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
          dispatch(
            PetReportStore.actions.getUserReportListAction(response.data.user)
          );
          dispatch(PetReportStore.actions.getPetReportListAction());
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

  getPetReportListAction(criteria?: any) {
    return async (dispatch: Dispatch<any>) => {
      dispatch({
        type: PetReportStore.ActionTypes.GET_REPORT_LIST
      });
      let url = 'pet-reports';
      if (criteria) {
        url += buildCriteria(criteria);
      }
      await Server.get(url)
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

  getUserReportListAction(userId: string, criteria?: any) {
    return async (dispatch: Dispatch<any>) => {
      dispatch({
        type: PetReportStore.ActionTypes.GET_USER_REPORT_LIST
      });
      let url = `pet-reports/user/${userId}`;
      if (criteria) {
        url += buildCriteria(criteria);
      }
      await Server.get(url)
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

  getFavoriteReportsAction(userId: string, criteria?: any) {
    return async (dispatch: Dispatch<any>) => {
      dispatch({
        type: PetReportStore.ActionTypes.GET_FAVORITE_REPORTS
      });
      let url = `pet-reports/${userId}/favorites`;
      if (criteria) {
        url += buildCriteria(criteria);
      }
      await Server.get(url)
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

  deleteReportAction(reportId: string) {
    return async (dispatch: Dispatch<any>) => {
      dispatch({
        type: PetReportStore.ActionTypes.DELETE_REPORT
      });
      await Server.delete(`pet-reports/${reportId}`)
        .then((response: any) => {
          dispatch({
            type: PetReportStore.ActionTypes.DELETE_REPORT_SUCCESS,
            payload: response.data as PetReportDTO
          });
          dispatch(
            PetReportStore.actions.getUserReportListAction(
              response.data.user._id
            )
          );
          dispatch(PetReportStore.actions.getPetReportListAction());
        })
        .catch((error) => {
          dispatch({
            type: PetReportStore.ActionTypes.DELETE_REPORT_FAILED,
            payload: Server.errorParse(error)
          });
        });
    };
  }
}

const petReportActions = new PetReportActions();
export default petReportActions;
