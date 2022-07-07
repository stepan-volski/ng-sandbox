import { Component, Input, OnInit } from '@angular/core';
import { Boardgame } from 'src/app/models/boardgame';
import { BoardgameType } from 'src/app/models/boardgameType';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {

  constructor() { }
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

}
