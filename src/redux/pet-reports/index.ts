/* eslint-disable @typescript-eslint/no-namespace */
import { PetReportDTO } from '../types';
import petReportActions, { IPetReportActions } from './actions';
import petReportReducer from './reducer';

export namespace PetReportStore {
  export type IState = {
    report: PetReportDTO | null;
    get_report_pending: boolean;
    get_report_error: string | null;
    edit_report_pending: boolean;
    edit_report_error: string | null;
    report_list: PetReportDTO[];
    get_report_list_pending: boolean;
    get_report_list_error: string | null;
    user_report_list: PetReportDTO[];
    get_user_report_list_pending: boolean;
    get_user_report_list_error: string | null;
    add_report_pending: boolean;
    add_report_error: string | null;
    add_favorite_report_pending: boolean;
    add_favorite_report_error: string | null;
    favorite_reports: PetReportDTO[];
    get_favorite_reports_pending: boolean;
    get_favorite_reports_error: string | null;
  };

  export const initialState: IState = {
    report: null,
    get_report_pending: false,
    get_report_error: null,
    edit_report_pending: false,
    edit_report_error: null,
    report_list: [],
    get_report_list_pending: false,
    get_report_list_error: null,
    user_report_list: [],
    get_user_report_list_pending: false,
    get_user_report_list_error: null,
    add_report_pending: false,
    add_report_error: null,
    add_favorite_report_pending: false,
    add_favorite_report_error: null,
    favorite_reports: [],
    get_favorite_reports_pending: false,
    get_favorite_reports_error: null
  };

  export enum ActionTypes {
    GET_REPORT = 'GET_REPORT',
    GET_REPORT_SUCCESS = 'GET_REPORT_SUCCESS',
    GET_REPORT_FAILED = 'GET_REPORT_FAILED',
    EDIT_REPORT = 'EDIT_REPORT',
    EDIT_REPORT_SUCCESS = 'EDIT_REPORT_SUCCESS',
    EDIT_REPORT_FAILED = 'EDIT_REPORT_FAILED',
    GET_REPORT_LIST = 'GET_REPORT_LIST',
    GET_REPORT_LIST_SUCCESS = 'GET_REPORT_LIST_SUCCESS',
    GET_REPORT_LIST_FAILED = 'GET_REPORT_LIST_FAILED',
    GET_USER_REPORT_LIST = 'GET_USER_REPORT_LIST',
    GET_USER_REPORT_LIST_SUCCESS = 'GET_USER_REPORT_LIST_SUCCESS',
    GET_USER_REPORT_LIST_FAILED = 'GET_USER_REPORT_LIST_FAILED',
    ADD_REPORT = 'ADD_REPORT',
    ADD_REPORT_SUCCESS = 'ADD_REPORT_SUCCESS',
    ADD_REPORT_FAILED = 'ADD_REPORT_FAILED',
    ADD_FAVORITE_REPORT = 'ADD_FAVORITE_REPORT',
    ADD_FAVORITE_REPORT_SUCCESS = 'ADD_FAVORITE_REPORT_SUCCESS',
    ADD_FAVORITE_REPORT_FAILED = 'ADD_FAVORITE_REPORT_FAILED',
    GET_FAVORITE_REPORTS = 'GET_FAVORITE_REPORTS',
    GET_FAVORITE_REPORTS_SUCCESS = 'GET_FAVORITE_REPORTS_SUCCESS',
    GET_FAVORITE_REPORTS_FAILED = 'GET_FAVORITE_REPORTS_FAILED'
  }

  export const actions = petReportActions;
  export const reducer = petReportReducer;
  export interface IActions extends IPetReportActions {}
}
