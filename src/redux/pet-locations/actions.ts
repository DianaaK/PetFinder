import { Dispatch } from 'redux';
import { ReportedLocationsStore } from './index';
import { Server } from '../../utils';
import { ReportedLocationDTO } from '../types';

export interface ILocationsActions {
  addPetLocationAction(petLocation: ReportedLocationDTO): void;
  getPetLocationsAction(reportId: string): void;
}

class LocationActions implements ILocationsActions {
  addPetLocationAction(petLocation: ReportedLocationDTO) {
    return async (dispatch: Dispatch<any>) => {
      dispatch({
        type: ReportedLocationsStore.ActionTypes.ADD_LOCATION
      });
      await Server.post(`pet-locations/add`, petLocation)
        .then((response: any) => {
          dispatch({
            type: ReportedLocationsStore.ActionTypes.ADD_LOCATION_SUCCESS,
            payload: response.data as ReportedLocationDTO
          });
          dispatch(
            ReportedLocationsStore.actions.getPetLocationsAction(
              petLocation.petId
            )
          );
        })
        .catch((error) => {
          dispatch({
            type: ReportedLocationsStore.ActionTypes.ADD_LOCATION_FAILED,
            payload: Server.errorParse(error)
          });
        });
    };
  }

  getPetLocationsAction(reportId: string) {
    return async (dispatch: Dispatch<any>) => {
      dispatch({
        type: ReportedLocationsStore.ActionTypes.GET_LOCATIONS_LIST
      });
      await Server.get(`pet-locations/${reportId}`)
        .then((response: any) => {
          dispatch({
            type: ReportedLocationsStore.ActionTypes.GET_LOCATIONS_SUCCESS,
            payload: response.data as ReportedLocationDTO[]
          });
        })
        .catch((error) => {
          dispatch({
            type: ReportedLocationsStore.ActionTypes.GET_LOCATIONS_FAILED,
            payload: Server.errorParse(error)
          });
        });
    };
  }
}

const locationsActions = new LocationActions();
export default locationsActions;
