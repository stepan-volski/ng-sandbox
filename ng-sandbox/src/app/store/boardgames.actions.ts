import { Action } from "@ngrx/store";
import { Boardgame } from "../models/boardgame";

export const ADD_GAME = 'ADD_GAME';
export const DELETE_GAME = 'DELETE_GAME';
export const EDIT_GAME = 'EDIT_GAME';
export const SET_GAMES = 'SET_GAMES';

export class AddGame implements Action {
  readonly type = ADD_GAME;
  constructor(public payload: Boardgame) {}
}

export class DeleteGame implements Action {
  readonly type = DELETE_GAME;
  constructor(public payload: string) {}
}

export class EditGame implements Action {
  readonly type = EDIT_GAME;
  constructor(public payload: Boardgame) {}
}

export class SetGames implements Action {
  readonly type = SET_GAMES;
  constructor(public payload: Boardgame[]) {}
}

export type BoardgameAction = AddGame | EditGame | DeleteGame | SetGames;
