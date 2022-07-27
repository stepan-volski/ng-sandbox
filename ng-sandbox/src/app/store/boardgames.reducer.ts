import { Boardgame } from '../models/boardgame';
import {
  ADD_GAME,
  BoardgameAction,
  DELETE_GAME,
  EDIT_GAME,
  SET_GAMES,
} from './boardgames.actions';

const initialState: GamesState = {
  games: []
};

export type GamesState = {
  games: Boardgame[]
}

export function boardgamesReducer(
  state = initialState,
  action: BoardgameAction
) {
  switch (action.type) {
    case ADD_GAME:
      return {
        ...state,
        games: [...state.games, action.payload],
      };

    case SET_GAMES:
      return {
        ...state,
        games: [...(action.payload || [])],
      };

    case EDIT_GAME:
      const index = state.games.findIndex(
        (game) => game.id === action.payload.id
      );
      const games = [...state.games];
      games[index] = action.payload;

      return {
        ...state,
        games: games,
      };

    case DELETE_GAME:
      const updatedGames = state.games.filter(
        (game) => game.id !== action.payload
      );
      return {
        ...state,
        games: updatedGames,
      };

    default:
      return state;
  }
}
