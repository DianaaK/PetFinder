import { Dispatch } from 'redux';
import Toast from 'react-native-toast-message';
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
          Toast.show({
            type: 'success',
            text1: 'Pet location added successfully!',
            visibilityTime: 2500
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
          Toast.show({
            type: 'error',
            text1: 'Due to an error, the pet location could not be added!',
            visibilityTime: 2500
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
