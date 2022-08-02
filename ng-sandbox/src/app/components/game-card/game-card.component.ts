import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Boardgame } from 'src/app/models/boardgame';
import { BoardgameType } from 'src/app/models/boardgameType';
import { User } from 'src/app/models/user';
import { BoardgamesService } from 'src/app/services/boardgames.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {
  constructor(
    public dialogServ: DialogService,
    private gameServ: BoardgamesService,
    private router: Router,
    private toastServ: ToastMessageService
  ) {}
  @Input() game!: Boardgame;
  @Input() loggedInUser!: User | null;
  boardgameType = BoardgameType;
  isBorrowedGame = false;
  showOverlay = false;
  showReturnButton = false;
  gameUrl = '';
  tooltipText = '';

  ngOnInit(): void {
    this.isBorrowedGame = !!this.game?.borrower;
    this.showReturnButton = this.game.owner?.id === this.loggedInUser?.id;
    this.tooltipText =
      this.game.borrower?.id === this.loggedInUser?.id
        ? `This game was borrowed from user ${this.game.owner.email}`
        : `This game was lent to user ${this.game.borrower?.email}`;
    this.gameUrl = `http://localhost:4200/game/${this.game.id}/?preview=true`;
  }

  editGame() {
    this.dialogServ.openEditGame(this.game);
  }

  deleteGame() {
    this.dialogServ.getDeleteConfirmation().subscribe((confirmation) => {
      if (confirmation) {
        this.gameServ.deleteGame(this.game.id);
      }
    });
  }

  lendGame() {
    if (this.loggedInUser) {
      this.dialogServ.openLendGame(this.game);
    }
  }

  showClipboardNotification() {
    console.log(this.gameUrl);
    this.toastServ.showSuccessMessage('Game url copied to clipboard');
  }

  returnGame() {
    const updatedGame = {
      ...this.game,
      borrower: undefined,
    };
    this.gameServ.returnGame(updatedGame);
  }

  incrementTimesPlayed() {
    const editedGame = { ...this.game };
    editedGame.timesPlayed++;
    this.gameServ.editGame(editedGame);
  }

  openGameDetails() {
    this.router.navigate([`/game/${this.game.id}`]);
  }
}
