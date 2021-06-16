import { ReportedLocationsStore } from './index';

function locationsReducer(
  state: ReportedLocationsStore.IState = ReportedLocationsStore.initialState,
  action: any
): ReportedLocationsStore.IState {
  switch (action.type) {
    case ReportedLocationsStore.ActionTypes.GET_LOCATIONS_LIST: {
      return {
        ...state,
        get_locations_list_pending: true,
        get_locations_list_error: null
      };
    }
    case ReportedLocationsStore.ActionTypes.GET_LOCATIONS_SUCCESS: {
      const nextState = {
        ...state,
        reported_locations: action.payload,
        get_locations_list_pending: false,
        get_locations_list_error: null
      };
      return nextState;
    }
    case ReportedLocationsStore.ActionTypes.GET_LOCATIONS_FAILED: {
      return {
        ...state,
        get_locations_list_pending: false,
        get_locations_list_error: action.payload
      };
    }

    case ReportedLocationsStore.ActionTypes.ADD_LOCATION: {
      return {
        ...state,
        add_location_pending: true,
        add_location_error: null
      };
    }
    case ReportedLocationsStore.ActionTypes.ADD_LOCATION_SUCCESS: {
      const nextState = {
        ...state,
        add_location_pending: false,
        add_location_error: null
      };
      return nextState;
    }
    case ReportedLocationsStore.ActionTypes.ADD_LOCATION_FAILED: {
      return {
        ...state,
        add_location_pending: false,
        add_location_error: action.payload
      };
    }
    default:
      return state;
  }
}

export default locationsReducer;
