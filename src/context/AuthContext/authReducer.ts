/* eslint-disable @typescript-eslint/no-explicit-any */
import { USER_LOADED, AUTH_ERROR, USER_LOGOUT, SET_TOKEN } from './types';
import { jwtTitle } from '../../constants';

export default (state: any, { type, payload, loadPayload }: any): any => {
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        loading: loadPayload,
        error: null,
      };
    case SET_TOKEN:
      return {
        ...state,
        isAuthenticated: false,
        user: loadPayload,
        loading: false,
        error: null,
      };
    case AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: loadPayload,
        error: payload,
      };
    case USER_LOGOUT:
      // eslint-disable-next-line no-undef
      localStorage.removeItem(jwtTitle);
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: loadPayload,
        error: null,
      };
    default:
      return state;
  }
};
