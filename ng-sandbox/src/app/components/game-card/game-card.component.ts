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

  constructor(public dServ: DialogService, private gServ: BoardgamesService) { }
  @Input() game!: Boardgame;
  boardgameType = BoardgameType;

  ngOnInit(): void {
  }

  setBorderColor(){
    switch(this.game.type){
      case this.boardgameType.Amero: return 'red';
      case this.boardgameType.Euro: return 'blue';
      case this.boardgameType.Party: return 'green';
      default: return 'black';
    }
  }

  editGame(){
    this.dServ.openEditGame(this.game);
  }

  deleteGame(){
    this.gServ.deleteGame(this.game.id);
  }

  incrementTimesPlayed(){
    const editedGame = { ...this.game };
    editedGame.timesPlayed++;
    this.gServ.editGame(editedGame);
  }

}
