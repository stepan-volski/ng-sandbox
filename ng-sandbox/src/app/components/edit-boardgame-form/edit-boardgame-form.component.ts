import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Boardgame } from 'src/app/models/boardgame';
import { BoardgameType } from 'src/app/models/boardgameType';
import { BoardgamesService } from 'src/app/services/boardgames.service';

@Component({
  selector: 'app-edit-boardgame-form',
  templateUrl: './edit-boardgame-form.component.html',
  styleUrls: ['./edit-boardgame-form.component.scss']
})
export class EditBoardgameFormComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {game: Boardgame},
    private gServ: BoardgamesService,
    ) { }

  boardgameType = BoardgameType;
  game!: Boardgame;

  ngOnInit(): void {
    this.game = { ...this.data.game };
  }

  saveGame(){
    this.gServ.editGame(this.game);
  }

}
