import { Action } from "@ngrx/store";
import { User } from "../models/user";

export const LOG_IN_START = 'LOG_IN_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const LOG_OUT = 'LOG_OUT';
export const SIGN_UP_START = 'SIGN_UP_START';

export class LogInStart implements Action {
  readonly type = LOG_IN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class SignUpStart implements Action {
  readonly type = SIGN_UP_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class AuthSuccess implements Action {
  readonly type = AUTH_SUCCESS;
  constructor(public payload: User) {}
}

export class AuthFail implements Action {
  readonly type = AUTH_FAIL;
}

export class LogOut implements Action {
  readonly type = LOG_OUT;
}

export type AuthAction = LogInStart | AuthFail | AuthSuccess | LogOut | SignUpStart;
