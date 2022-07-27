import { User } from '../models/user';
import {
  AuthAction,
  AUTH_FAIL,
  AUTH_SUCCESS,
  LOG_OUT,
  SET_USER,
} from './auth.actions';

const initialState: AuthState = {
  user: null
};

export type AuthState = {
  user: User | null
}

export function authReducer(
  state = initialState,
  action: AuthAction
) {
  switch (action.type) {
    case AUTH_FAIL:
      return {
        ...state,
        user: null,
      };

    case AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    case LOG_OUT:
      return {
        ...state,
        user: null,
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}
