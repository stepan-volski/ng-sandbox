import { Action } from '@ngrx/store';
import {
  SortDirection,
  SortType
} from '../components/filters/filters.component';
import { BoardgameType } from '../models/boardgameType';

export const SET_SORT_DIRECTION = 'SET_SORT_DIRECTION';
export const SET_SORT_TYPE = 'SET_SORT_TYPE';
export const SET_FILTER_TYPE = 'SET_FILTER_TYPE';
export const SEARCH = 'SEARCH';

export class SetSortDirection implements Action {
  readonly type = SET_SORT_DIRECTION;
  constructor(public payload: SortDirection) {}
}

export class SetSortType implements Action {
  readonly type = SET_SORT_TYPE;
  constructor(public payload: SortType) {}
}

export class SetFilterType implements Action {
  readonly type = SET_FILTER_TYPE;
  constructor(public payload: BoardgameType | 'all') {}
}

export class Search implements Action {
  readonly type = SEARCH;
  constructor(public payload: string) {}
}

export type FiltersAction =
  | SetSortDirection
  | SetSortType
  | SetFilterType
  | Search;
