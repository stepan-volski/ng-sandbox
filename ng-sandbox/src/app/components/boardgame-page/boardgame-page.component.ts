import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Boardgame } from 'src/app/models/boardgame';
import { BoardgameType } from 'src/app/models/boardgameType';
import {MatDialog} from '@angular/material/dialog';
import { AddBoardgameFormComponent } from '../add-boardgame-form/add-boardgame-form.component';
import { BoardgamesService } from 'src/app/services/boardgames.service';
import { Subscription } from 'rxjs/internal/Subscription';
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
  gamesChangedSub!: Subscription;
  filterSub!: Subscription;
  boardgames: Boardgame[] = [];
  sortDirection: 'asc' | 'desc' = 'asc';
  sortType: 'name' | 'date' | 'playTime' | 'none' = 'none';
  filterType: BoardgameType | 'all' = 'all';
  searchRequest: string = '';
  displayedItems!: number;

  constructor(
    public dialog: MatDialog,
    public bgServ: BoardgamesService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.boardgames = this.bgServ.getBoardgames();

    this.gamesChangedSub = this.bgServ.gamesChanged.subscribe(
      (games: Boardgame[]) => {
        this.boardgames = games;
        this.sort();
      }
    );
  }

  ngAfterViewInit(): void {
    this.filterSub = this.cards.changes.subscribe((value) => {
      this.displayedItems = value.length;
      this.cd.detectChanges();
    });
  }

  sort() {
    switch (this.sortType) {
      case 'name':
        this.sortDirection === 'asc'
          ? this.boardgames.sort((a, b) => a.name.localeCompare(b.name))
          : this.boardgames.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'playTime':
        this.sortDirection === 'asc'
          ? this.boardgames.sort((a, b) => a.timesPlayed - b.timesPlayed)
          : this.boardgames.sort((a, b) => b.timesPlayed - a.timesPlayed);
        break;
      case 'date':
        this.sortDirection === 'asc'
          ? this.boardgames.sort((a, b) => Date.parse(a.purchaseDate) - Date.parse(b.purchaseDate))
          : this.boardgames.sort((a, b) => Date.parse(b.purchaseDate) - Date.parse(a.purchaseDate));
        break;
      case 'none':
        this.boardgames = this.bgServ.getBoardgames();
        break;
    }
  }

  addGame() {
    this.dialog.open(AddBoardgameFormComponent);
  }

  ngOnDestroy(): void {
    this.gamesChangedSub.unsubscribe();
    this.gamesChangedSub.unsubscribe();
  }
}
