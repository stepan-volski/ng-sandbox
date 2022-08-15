import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Boardgame } from 'src/app/models/boardgame';
import { BoardgameType } from 'src/app/models/boardgameType';
import { AuthService } from 'src/app/services/auth.service';
import { BoardgamesService } from 'src/app/services/boardgames.service';

@Component({
  selector: 'app-add-boardgame-form',
  templateUrl: './add-boardgame-form.component.html',
  styleUrls: ['./add-boardgame-form.component.scss'],
})
export class AddBoardgameFormComponent implements OnInit {
  constructor(
    private gameServ: BoardgamesService,
    private authServ: AuthService
  ) {}

  boardgameType = BoardgameType;

  ngOnInit(): void {}

  addGame(form: NgForm) {
    const owner = this.authServ.getLoggedInUser();
    if (owner) {
      const name: string = form.value.name;
      const type: BoardgameType = form.value.type;
      const date: string = form.value.date;
      const timesPlayed: number = form.value.timesPlayed;
      this.gameServ.addGame(new Boardgame(name, type, date, timesPlayed, owner));
    }
  }
}
