import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Boardgame } from 'src/app/models/boardgame';
import { BoardgameType } from 'src/app/models/boardgameType';
import { BoardgamesService } from 'src/app/services/boardgames.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { GameCardComponent } from '../game-card/game-card.component';
import { DialogService } from 'src/app/services/dialog.service';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { AppState } from 'src/app/store/app.reducer';

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
  loggedInUser: User | null = null

  constructor(
    public gameServ: BoardgamesService,
    public dialogServ: DialogService,
    private cd: ChangeDetectorRef,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.gameServ.fetchGames();
    this.store.subscribe(state => {
      this.boardgames = state.games.games;
      this.displayedItems = state.games.games.length;
      this.loggedInUser = state.auth.user;
    });

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

  ngOnDestroy(): void {
    this.filterSub.unsubscribe();
  }

}

//todo
//cleanup navigation UI (menu)
