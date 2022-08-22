import * as fromBoardgames from './boardgames.reducer';
import * as fromAuth from './auth.reducer';
import * as fromUI from './ui.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  games: fromBoardgames.GamesState;
  auth: fromAuth.AuthState;
  ui: fromUI.UIState;
}

export const appReducers: ActionReducerMap<AppState, any> = {
  games: fromBoardgames.boardgamesReducer,
  auth: fromAuth.authReducer,
  ui: fromUI.uiReducer,
};
