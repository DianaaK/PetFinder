/* eslint-disable @typescript-eslint/no-namespace */
import { ReportedLocationDTO } from '../types';
import locationsActions, { ILocationsActions } from './actions';
import locationsReducer from './reducer';

export namespace ReportedLocationsStore {
  export type IState = {
    reported_locations: ReportedLocationDTO[];
    get_locations_list_pending: boolean;
    get_locations_list_error: string | null;
    add_location_pending: boolean;
    add_location_error: string | null;
  };

  export const initialState: IState = {
    reported_locations: [],
    get_locations_list_pending: false,
    get_locations_list_error: null,
    add_location_pending: false,
    add_location_error: null
  };

  export enum ActionTypes {
    GET_LOCATIONS_LIST = 'GET_LOCATIONS_LIST',
    GET_LOCATIONS_SUCCESS = 'GET_LOCATIONS_SUCCESS',
    GET_LOCATIONS_FAILED = 'GET_LOCATIONS_FAILED',
    ADD_LOCATION = 'ADD_LOCATION',
    ADD_LOCATION_SUCCESS = 'ADD_LOCATION_SUCCESS',
    ADD_LOCATION_FAILED = 'ADD_LOCATION_FAILED'
  }

  export const actions = locationsActions;
  export const reducer = locationsReducer;
  export interface IActions extends ILocationsActions {}
}
