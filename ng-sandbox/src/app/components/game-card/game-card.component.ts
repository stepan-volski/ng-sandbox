import { Component, Input, OnInit } from '@angular/core';
import { Boardgame } from 'src/app/models/boardgame';
import { BoardgameType } from 'src/app/models/boardgameType';
import { User } from 'src/app/models/user';
import { BoardgamesService } from 'src/app/services/boardgames.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {
  constructor(
    public dialogServ: DialogService,
    private gameServ: BoardgamesService
  ) {}
  @Input() game!: Boardgame;
  @Input() loggedInUser!: User | null;
  boardgameType = BoardgameType;
  isBorrowedGame = false;
  tooltipText = '';
  showOverlay = false;

  ngOnInit(): void {
    this.isBorrowedGame = !!this.game.lentFromUser;
    this.tooltipText = this.game.lentId
      ? `This game was lent to user ${this.game.lentToUser?.email}`
      : `This game was borrowed from user ${this.game.lentFromUser?.email}`;
  }

  editGame() {
    this.dialogServ.openEditGame(this.game);
  }

  deleteGame() {
    this.gameServ.deleteGame(this.game.id);
  }

  lendGame() {
    if (this.loggedInUser) {
      this.dialogServ.openLendGame(this.game, this.loggedInUser);
    }
  }

  returnGame() {
    this.gameServ.returnGame(this.game);
  }

  incrementTimesPlayed() {
    const editedGame = { ...this.game };
    editedGame.timesPlayed++;
    this.gameServ.editGame(editedGame);
  }
}
