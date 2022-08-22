import {
  SortDirection,
  SortType,
} from '../components/filters/filters.component';
import { BoardgameType } from '../models/boardgameType';
import {
  FiltersAction,
  SEARCH,
  SET_FILTER_TYPE,
  SET_SORT_DIRECTION,
  SET_SORT_TYPE,
} from './filters.actions';

const initialState: FiltersState = {
  sortDirection: SortDirection.Asc,
  sortType: SortType.None,
  filterType: 'all',
  searchRequest: '',
};

export type FiltersState = {
  sortDirection: SortDirection;
  sortType: SortType;
  filterType: BoardgameType | 'all';
  searchRequest: string;
};

export function filtersReducer(state = initialState, action: FiltersAction) {
  switch (action.type) {
    case SET_SORT_DIRECTION:
      return {
        ...state,
        sortDirection: action.payload,
      };

    case SET_SORT_TYPE:
      return {
        ...state,
        sortType: action.payload,
      };

    case SET_FILTER_TYPE:
      return {
        ...state,
        filterType: action.payload,
      };

    case SEARCH:
      return {
        ...state,
        searchRequest: action.payload,
      };

    default:
      return state;
  }
}
