import { Component, Input, OnInit } from '@angular/core';
import { Boardgame } from 'src/app/models/boardgame';
import { BoardgameType } from 'src/app/models/boardgameType';
import { BoardgamesService } from 'src/app/services/boardgames.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {

  constructor(public dialogServ: DialogService, private gameServ: BoardgamesService) { }
  @Input() game!: Boardgame;
  @Input() isUserLoggedIn = false;
  boardgameType = BoardgameType;

  ngOnInit(): void {
  }

  editGame(){
    this.dialogServ.openEditGame(this.game);
  }

  deleteGame(){
    this.gameServ.deleteGame(this.game.id);
  }

  incrementTimesPlayed(){
    const editedGame = { ...this.game };
    editedGame.timesPlayed++;
    this.gameServ.editGame(editedGame);
  }

}
