import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Boardgame } from 'projects/game-pipes/src/public-api';
import { AddBoardgameFormComponent } from '../components/add-boardgame-form/add-boardgame-form.component';
import { EditBoardgameFormComponent } from '../components/edit-boardgame-form/edit-boardgame-form.component';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { LoginType } from '../models/loginType';

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

  openLogin(type: LoginType){
    this.dialog.open(LoginFormComponent, {
      data: {type: type}
    })
  }

}
