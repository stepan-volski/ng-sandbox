import * as fromBoardgames from './boardgames.reducer';
import * as fromAuth from './auth.reducer';

export interface AppState {
  games: fromBoardgames.GamesState;
  auth: fromAuth.AuthState;
}
