import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Boardgame } from '../models/boardgame';
import { AppState } from '../store/app.reducer';
import {
  CollapseSidenav,
  DeselectGame,
  DisplayGridView,
  DisplayTableView,
  ExpandSidenav,
  SelectGame,
  ToggleSidenav,
} from '../store/ui.actions';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor(private store: Store<AppState>) {}

  expandSidenav() {
    this.store.dispatch(new ExpandSidenav());
  }

  collapseSidenav() {
    this.store.dispatch(new CollapseSidenav());
  }

  toggleSidenav() {
    this.store.dispatch(new ToggleSidenav());
  }

  displayTableView() {
    this.store.dispatch(new DisplayTableView());
  }

  displayGridView() {
    this.store.dispatch(new DisplayGridView());
  }

  selectGame(game: Boardgame) {
    this.store.dispatch(new SelectGame(game));
  }

  deselectGame() {
    this.store.dispatch(new DeselectGame());
  }
}
