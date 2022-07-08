import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Boardgame } from 'src/app/models/boardgame';
import { BoardgameType } from 'src/app/models/boardgameType';
import { BoardgamesService } from 'src/app/services/boardgames.service';

@Component({
  selector: 'app-add-boardgame-form',
  templateUrl: './add-boardgame-form.component.html',
  styleUrls: ['./add-boardgame-form.component.scss']
})
export class AddBoardgameFormComponent implements OnInit {

  constructor(private bgSrv: BoardgamesService) { }

  boardgameType = BoardgameType;

  ngOnInit(): void {
  }

  addGame(form: NgForm){
    const name: string = form.value.name;
    const type: BoardgameType = form.value.type;
    const date: string = form.value.date;
    const timesPlayed: number = form.value.timesPlayed;
    this.bgSrv.addGame(new Boardgame(name, type, date, timesPlayed));
  }

}
