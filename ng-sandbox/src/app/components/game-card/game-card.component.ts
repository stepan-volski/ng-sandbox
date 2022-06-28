import { Component, Input, OnInit } from '@angular/core';
import { Boardgame } from 'src/app/models/boardgame';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {

  constructor() { }
  @Input() game!: Boardgame;

  ngOnInit(): void {
  }

  setBorderColor(){
    switch(this.game.type){
      case 'amero': return 'red';
      case 'euro': return 'blue';
      case 'party': return 'green';
      default: return 'black';
    }
  }

}
