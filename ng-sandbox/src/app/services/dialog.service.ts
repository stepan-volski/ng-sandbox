import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBoardgameFormComponent } from '../components/add-boardgame-form/add-boardgame-form.component';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { EditBoardgameFormComponent } from '../components/edit-boardgame-form/edit-boardgame-form.component';
import { LendBoardgameFormComponent } from '../components/lend-boardgame-form/lend-boardgame-form.component';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { Boardgame } from '../models/boardgame';
import { LoginType } from '../models/loginType';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  openAddGame() {
    this.dialog.open(AddBoardgameFormComponent);
  }

  openEditGame(game: Boardgame) {
    this.dialog.open(EditBoardgameFormComponent, {
      data: { game: game },
    });
  }

  openLendGame(game: Boardgame) {
    this.dialog.open(LendBoardgameFormComponent, {
      data: { game: game },
    });
  }

  openLogin(type: LoginType) {
    this.dialog.open(LoginFormComponent, {
      data: { type: type },
    });
  }

  getDeleteConfirmation() { //can be reused, need to add data param
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    return dialogRef.afterClosed();
  }
}
