import { Component, OnDestroy, OnInit } from '@angular/core';
import { Boardgame } from 'src/app/models/boardgame';
import { BoardgameType } from 'src/app/models/boardgameType';
import {MatDialog} from '@angular/material/dialog';
import { AddBoardgameFormComponent } from '../add-boardgame-form/add-boardgame-form.component';
import { BoardgamesService } from 'src/app/services/boardgames.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-boardgame-page',
  templateUrl: './boardgame-page.component.html',
  styleUrls: ['./boardgame-page.component.scss'],
})
export class BoardgamePageComponent implements OnInit, OnDestroy {

  boardgames: Boardgame[] = [];
  sortDirection: 'asc' | 'desc' = 'asc';
  sortType: 'name' | 'date' | 'playTime' | 'none' = 'none';
  filterType: BoardgameType | 'all' = 'all';
  subscription: Subscription | null = null;

  constructor(public dialog: MatDialog, public bgServ: BoardgamesService) {}

  ngOnInit(): void {
    this.boardgames = this.bgServ.getBoardgames();

    this.subscription = this.bgServ.gamesChanged.subscribe(
      (games: Boardgame[]) => {
        this.boardgames = games;
        this.sort();
      }
    )
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
          ? this.boardgames.sort((a, b) => a.purchaseDate.getTime() - b.purchaseDate.getTime())
          : this.boardgames.sort((a, b) => b.purchaseDate.getTime() - a.purchaseDate.getTime());
        break;
      case 'none': this.boardgames = this.bgServ.getBoardgames();
        break;
    }
  }

  addGame(){
    this.dialog.open(AddBoardgameFormComponent);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }


  //todo:
  //navigation design
  //card design
  //games page design
  // import json
  //add game form design

}
