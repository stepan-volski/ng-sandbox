import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { BoardgameType } from 'src/app/models/boardgameType';
import { AppState } from 'src/app/store/app.reducer';
import {
  Search,
  SetFilterType,
  SetSortDirection,
  SetSortType
} from 'src/app/store/filters.actions';

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export enum SortType {
  Name = 'name',
  Date = 'date',
  PlayTime = 'playTime',
  None = 'none',
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Input() itemsCount?: Subject<number>;
  sortDirection?: SortDirection;
  sortType?: SortType;
  filterType?: BoardgameType | 'all';
  searchRequest: string = '';
  boardgameType = BoardgameType;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.sortDirection = state.filters.sortDirection;
      this.filterType = state.filters.filterType;
      this.sortType = state.filters.sortType;
      this.searchRequest = state.filters.searchRequest;
    });

    this.itemsCount?.subscribe();
  }

  onFilterTypeChange(value: BoardgameType | 'all') {
    this.store.dispatch(new SetFilterType(value));
  }

  onSortDirectionChange(value: SortDirection) {
    this.store.dispatch(new SetSortDirection(value));
  }

  onSortTypeChange(value: SortType) {
    this.store.dispatch(new SetSortType(value));
  }

  onSearchChange() {
    this.store.dispatch(new Search(this.searchRequest));
  }
}
