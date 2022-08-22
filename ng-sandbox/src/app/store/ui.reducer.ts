import { Boardgame } from '../models/boardgame';
import {
  COLLAPSE_SIDENAV,
  DESELECT_GAME,
  DISPLAY_GRID_VIEW,
  DISPLAY_TABLE_VIEW,
  EXPAND_SIDENAV,
  SELECT_GAME,
  TOGGLE_SIDENAV,
  UIAction,
} from './ui.actions';

const initialState: UIState = {
  selectedGame: undefined,
  isSidenavExpanded: false,
  isDisplayTableView: false,
};

export type UIState = {
  selectedGame: Boardgame | undefined;
  isSidenavExpanded: boolean;
  isDisplayTableView: boolean;
};

export function uiReducer(state = initialState, action: UIAction) {
  switch (action.type) {
    case SELECT_GAME:
      return {
        ...state,
        selectedGame: action.payload,
      };

    case DESELECT_GAME:
      return {
        ...state,
        selectedGame: undefined,
      };

    case EXPAND_SIDENAV:
      return {
        ...state,
        isSidenavExpanded: true,
      };

    case COLLAPSE_SIDENAV:
      return {
        ...state,
        isSidenavExpanded: false,
      };

      case TOGGLE_SIDENAV:
        return {
          ...state,
          isSidenavExpanded: !state.isSidenavExpanded,
        };

    case DISPLAY_TABLE_VIEW:
      return {
        ...state,
        isDisplayTableView: true,
      };

    case DISPLAY_GRID_VIEW:
      return {
        ...state,
        isDisplayTableView: false,
      };

    default:
      return state;
  }
}
