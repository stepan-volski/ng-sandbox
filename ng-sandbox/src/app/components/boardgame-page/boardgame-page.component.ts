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
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { Boardgame } from 'src/app/models/boardgame';
import { BoardgameType } from 'src/app/models/boardgameType';
import { User } from 'src/app/models/user';
import { BggGameService } from 'src/app/services/bgg-game.service';
import { BoardgamesService } from 'src/app/services/boardgames.service';
import { DialogService } from 'src/app/services/dialog.service';
import { UiService } from 'src/app/services/ui.service';
import { AppState } from 'src/app/store/app.reducer';
import { SortDirection, SortType } from '../filters/filters.component';
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
  sortDirection: SortDirection = SortDirection.Asc;
  sortType: SortType = SortType.None;
  filterType: BoardgameType | 'all' = 'all';
  searchRequest: string = '';
  displayedItems!: number;
  boardgameType = BoardgameType;
  loggedInUser: User | null = null;
  isSidenavExpanded: boolean = false;
  isDisplayTableView: boolean = false;
  itemsCount = new Subject<number>();

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
      this.filterType = state.filters.filterType;
      this.sortDirection = state.filters.sortDirection;
      this.sortType = state.filters.sortType;
      this.searchRequest = state.filters.searchRequest;
    });

    if (this.loggedInUser) {
      this.gameServ.getUserGames(this.loggedInUser.id);
    }

  }

  ngAfterViewInit(): void {
    this.filterSub = this.cards.changes.subscribe((value) => {
      this.itemsCount.next(value.length);
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

// drag-and-drop (for lend game? or for game thumbnail)
