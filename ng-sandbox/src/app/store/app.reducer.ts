import * as fromBoardgames from './boardgames.reducer';
import * as fromAuth from './auth.reducer';
import * as fromUI from './ui.reducer';
import * as fromFilters from './filters.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  games: fromBoardgames.GamesState;
  auth: fromAuth.AuthState;
  ui: fromUI.UIState;
  filters: fromFilters.FiltersState;
}

export const appReducers: ActionReducerMap<AppState, any> = {
  games: fromBoardgames.boardgamesReducer,
  auth: fromAuth.authReducer,
  ui: fromUI.uiReducer,
  filters: fromFilters.filtersReducer,
};
