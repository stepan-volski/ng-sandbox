import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Boardgame } from 'src/app/models/boardgame';
import { BoardgameType } from 'src/app/models/boardgameType';
import { AppState } from 'src/app/store/app.reducer';

export enum SortDirection {
  Asc = "asc",
  Desc = "desc",
}

export enum SortType {
  Name = "name",
  Date = "date",
  PlayTime = "playTime",
  None = "none",
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  filterSub!: Subscription;
  boardgames: Boardgame[] = [];
  sortDirection: 'asc' | 'desc' = 'asc';
  sortType: 'name' | 'date' | 'playTime' | 'none' = 'none';
  filterType: BoardgameType | 'all' = 'all';
  searchRequest: string = '';
  displayedItems!: number;
  boardgameType = BoardgameType;

  constructor(    private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.store.subscribe((state) => {
    //   this.sortDirection = state.filters.sortDirection;
    //   this.filterType = state.filters.filterType;
    //   this.sortType = state.filters.sortType;
    //   this.searchRequest = state.filters.searchRequest;
    // });
  }

  // ngAfterViewInit(): void {
  //   this.filterSub = this.cards.changes.subscribe((value) => {
  //     this.displayedItems = value.length;
  //     this.cd.detectChanges();
  //   });
  // }

  setFilterType() {
    setFilterType
  }

}
