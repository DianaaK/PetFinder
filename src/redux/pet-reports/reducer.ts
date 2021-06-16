import { PetReportStore } from './index';

function petReportReducer(
  state: PetReportStore.IState = PetReportStore.initialState,
  action: any
): PetReportStore.IState {
  switch (action.type) {
    case PetReportStore.ActionTypes.GET_REPORT: {
      return {
        ...state,
        get_report_pending: true,
        get_report_error: null
      };
    }
    case PetReportStore.ActionTypes.GET_REPORT_SUCCESS: {
      const nextState = {
        ...state,
        report: action.payload,
        get_report_pending: false,
        get_report_error: null
      };
      return nextState;
    }
    case PetReportStore.ActionTypes.GET_REPORT_FAILED: {
      return {
        ...state,
        get_report_pending: false,
        get_report_error: action.payload
      };
    }
    case PetReportStore.ActionTypes.EDIT_REPORT: {
      return {
        ...state,
        edit_report_pending: true,
        edit_report_error: null
      };
    }
    case PetReportStore.ActionTypes.EDIT_REPORT_SUCCESS: {
      const nextState = {
        ...state,
        report: action.payload,
        edit_report_pending: false,
        edit_report_error: null
      };
      return nextState;
    }
    case PetReportStore.ActionTypes.EDIT_REPORT_FAILED: {
      return {
        ...state,
        edit_report_pending: false,
        edit_report_error: action.payload
      };
    }
    case PetReportStore.ActionTypes.GET_REPORT_LIST: {
      return {
        ...state,
        get_report_list_pending: true,
        get_report_list_error: null
      };
    }
    case PetReportStore.ActionTypes.GET_REPORT_LIST_SUCCESS: {
      const nextState = {
        ...state,
        report_list: action.payload,
        get_report_list_pending: false,
        get_report_list_error: null
      };
      return nextState;
    }
    case PetReportStore.ActionTypes.GET_REPORT_LIST_FAILED: {
      return {
        ...state,
        get_report_list_pending: false,
        get_report_list_error: action.payload
      };
    }
    case PetReportStore.ActionTypes.GET_USER_REPORT_LIST: {
      return {
        ...state,
        get_user_report_list_pending: true,
        get_user_report_list_error: null
      };
    }
    case PetReportStore.ActionTypes.GET_USER_REPORT_LIST_SUCCESS: {
      const nextState = {
        ...state,
        user_report_list: action.payload,
        get_user_report_list_pending: false,
        get_user_report_list_error: null
      };
      return nextState;
    }
    case PetReportStore.ActionTypes.GET_USER_REPORT_LIST_FAILED: {
      return {
        ...state,
        get_user_report_list_pending: false,
        get_user_report_list_error: action.payload
      };
    }
    case PetReportStore.ActionTypes.ADD_REPORT: {
      return {
        ...state,
        add_report_pending: true,
        add_report_error: null
      };
    }
    case PetReportStore.ActionTypes.ADD_REPORT_SUCCESS: {
      const nextState = {
        ...state,
        add_report_pending: false,
        add_report_error: null
      };
      return nextState;
    }
    case PetReportStore.ActionTypes.ADD_REPORT_FAILED: {
      return {
        ...state,
        add_report_pending: false,
        add_report_error: action.payload
      };
    }
    case PetReportStore.ActionTypes.ADD_FAVORITE_REPORT: {
      return {
        ...state,
        add_favorite_report_pending: true,
        add_favorite_report_error: null
      };
    }
    case PetReportStore.ActionTypes.ADD_FAVORITE_REPORT_SUCCESS: {
      const nextState = {
        ...state,
        report: action.payload,
        add_favorite_report_pending: false,
        add_favorite_report_error: null
      };
      return nextState;
    }
    case PetReportStore.ActionTypes.ADD_FAVORITE_REPORT_FAILED: {
      return {
        ...state,
        add_favorite_report_pending: false,
        add_favorite_report_error: action.payload
      };
    }
    case PetReportStore.ActionTypes.GET_FAVORITE_REPORTS: {
      return {
        ...state,
        get_favorite_reports_pending: true,
        get_favorite_reports_error: null
      };
    }
    case PetReportStore.ActionTypes.GET_FAVORITE_REPORTS_SUCCESS: {
      const nextState = {
        ...state,
        favorite_reports: action.payload,
        get_favorite_reports_pending: false,
        get_favorite_reports_error: null
      };
      return nextState;
    }
    case PetReportStore.ActionTypes.GET_FAVORITE_REPORTS_FAILED: {
      return {
        ...state,
        get_favorite_reports_pending: false,
        get_favorite_reports_error: action.payload
      };
    }
    default:
      return state;
  }
}

export default petReportReducer;
