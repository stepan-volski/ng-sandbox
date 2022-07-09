import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Boardgame } from 'projects/game-pipes/src/public-api';
import { AddBoardgameFormComponent } from '../components/add-boardgame-form/add-boardgame-form.component';
import { EditBoardgameFormComponent } from '../components/edit-boardgame-form/edit-boardgame-form.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }


  openAddGame(){
    this.dialog.open(AddBoardgameFormComponent);
  }

  openEditGame(game: Boardgame){
    this.dialog.open(EditBoardgameFormComponent, {
      data: {game: game},
    });
  }

}
