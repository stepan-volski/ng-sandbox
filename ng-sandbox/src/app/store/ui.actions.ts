import { Action } from '@ngrx/store';
import { Boardgame } from '../models/boardgame';

export const SELECT_GAME = 'SELECT_GAME';
export const DESELECT_GAME = 'DESELECT_GAME';
export const EXPAND_SIDENAV = 'EXPAND_SIDENAV';
export const COLLAPSE_SIDENAV = 'COLLAPSE_SIDENAV';
export const TOGGLE_SIDENAV = 'TOGGLE_SIDENAV';
export const DISPLAY_TABLE_VIEW = 'DISPLAY_TABLE_VIEW';
export const DISPLAY_GRID_VIEW = 'DISPLAY_GRID_VIEW';

export class SelectGame implements Action {
  readonly type = SELECT_GAME;
  constructor(public payload: Boardgame) {}
}

export class DeselectGame implements Action {
  readonly type = DESELECT_GAME;
}

export class ExpandSidenav implements Action {
  readonly type = EXPAND_SIDENAV;
}

export class CollapseSidenav implements Action {
  readonly type = COLLAPSE_SIDENAV;
}

export class ToggleSidenav implements Action {
  readonly type = TOGGLE_SIDENAV;
}

export class DisplayTableView implements Action {
  readonly type = DISPLAY_TABLE_VIEW;
}

export class DisplayGridView implements Action {
  readonly type = DISPLAY_GRID_VIEW;
}

export type UIAction =
  | SelectGame
  | DeselectGame
  | ExpandSidenav
  | CollapseSidenav
  | ToggleSidenav
  | DisplayTableView
  | DisplayGridView;
