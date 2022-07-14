import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Boardgame } from 'src/app/models/boardgame';
import { BoardgameType } from 'src/app/models/boardgameType';
import { BoardgamesService } from 'src/app/services/boardgames.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { GameCardComponent } from '../game-card/game-card.component';
import { DialogService } from 'src/app/services/dialog.service';
import { Store } from '@ngrx/store';
import { GamesState } from 'src/app/store/gamesState';

@Component({
  selector: 'app-boardgame-page',
  templateUrl: './boardgame-page.component.html',
  styleUrls: ['./boardgame-page.component.scss'],
})

export class BoardgamePageComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChildren(GameCardComponent) cards!: QueryList<GameCardComponent>;
  gamesChangedSub!: Subscription;
  filterSub!: Subscription;
  boardgames: Boardgame[] = [];
  sortDirection: 'asc' | 'desc' = 'asc';
  sortType: 'name' | 'date' | 'playTime' | 'none' = 'none';
  filterType: BoardgameType | 'all' = 'all';
  searchRequest: string = '';
  displayedItems!: number;
  boardgameType = BoardgameType;

  constructor(
    public gServ: BoardgamesService,
    public dServ: DialogService,
    private cd: ChangeDetectorRef,
    private store: Store<{ games: GamesState }>,
  ) {}

  ngOnInit(): void {
    this.gServ.fetchGames();
    this.store.subscribe(state => {
      this.boardgames = state.games.games;
      this.displayedItems = state.games.games.length;
    });

  }

  ngAfterViewInit(): void {
    this.filterSub = this.cards.changes.subscribe((value) => {
      this.displayedItems = value.length;
      this.cd.detectChanges();
    });
  }

  addGame() {
    this.dServ.openAddGame();
  }

  ngOnDestroy(): void {
    this.filterSub.unsubscribe();
  }

}
