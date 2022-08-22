import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';
import { Boardgame } from 'src/app/models/boardgame';
import { BoardgameType } from 'src/app/models/boardgameType';
import { User } from 'src/app/models/user';
import { BggGameService } from 'src/app/services/bgg-game.service';
import { BoardgamesService } from 'src/app/services/boardgames.service';
import { DialogService } from 'src/app/services/dialog.service';
import { UiService } from 'src/app/services/ui.service';
import { AppState } from 'src/app/store/app.reducer';
import { GameCardComponent } from '../game-card/game-card.component';

@Component({
  selector: 'app-boardgame-page',
  templateUrl: './boardgame-page.component.html',
  styleUrls: ['./boardgame-page.component.scss'],
})
export class BoardgamePageComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChildren(GameCardComponent) cards!: QueryList<GameCardComponent>;
  filterSub!: Subscription;
  boardgames: Boardgame[] = [];
  sortDirection: 'asc' | 'desc' = 'asc';
  sortType: 'name' | 'date' | 'playTime' | 'none' = 'none';
  filterType: BoardgameType | 'all' = 'all';
  searchRequest: string = '';
  displayedItems!: number;
  boardgameType = BoardgameType;
  loggedInUser: User | null = null;
  isSidenavExpanded: boolean = false;
  isDisplayTableView: boolean = false;

  constructor(
    public gameServ: BoardgamesService,
    public bggServ: BggGameService,
    public dialogServ: DialogService,
    public uiServ: UiService,
    private cd: ChangeDetectorRef,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.boardgames = state.games.games;  //is it correct store usage, or should games (user, items etc) be observable?
      this.displayedItems = state.games.games.length;
      this.loggedInUser = state.auth.user;
      this.isSidenavExpanded = state.ui.isSidenavExpanded;
      this.isDisplayTableView = state.ui.isDisplayTableView;
    });

    if (this.loggedInUser) {
      this.gameServ.getUserGames(this.loggedInUser.id);
    }
  }

  ngAfterViewInit(): void {
    this.filterSub = this.cards.changes.subscribe((value) => {
      this.displayedItems = value.length;
      this.cd.detectChanges();
    });
  }

  addGame() {
    this.dialogServ.openAddGame();
  }

  toggleSidenav() {
    this.uiServ.toggleSidenav();
  }

  displayTableView() {
    this.uiServ.displayTableView();
  }

  displayGridView() {
    this.uiServ.displayGridView();
  }

  ngOnDestroy(): void {
    this.filterSub.unsubscribe();
  }
}

// combine edit game form and add game form
// continue to game details after log in
// drag-and-drop (for lend game? or for game thumbnail)
// game video in iframe on details page
// add truncation to long names
// separate page for nonLoggedIn user, get rid of loggedIn checks

// refactor: split main page into components
// move interface state (selectedfilter, game, search etc) to store. All this should be as observables.
// redesign card: remove date, set min size
// table, mark selected item
