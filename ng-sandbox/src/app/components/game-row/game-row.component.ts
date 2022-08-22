import { Component, Input, OnInit } from '@angular/core';
import { Boardgame } from 'src/app/models/boardgame';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-game-row',
  templateUrl: './game-row.component.html',
  styleUrls: ['./game-row.component.scss']
})
export class GameRowComponent implements OnInit {

  constructor() { }
  @Input() game!: Boardgame;
  @Input() loggedInUser!: User | null;

  ngOnInit(): void {
  }

}
