import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { BggGameShort } from 'src/app/models/bggGameShort';
import { Boardgame } from 'src/app/models/boardgame';
import { BoardgameType } from 'src/app/models/boardgameType';
import { AuthService } from 'src/app/services/auth.service';
import { BggGameService } from 'src/app/services/bgg-game.service';
import { BoardgamesService } from 'src/app/services/boardgames.service';

@Component({
  selector: 'app-add-boardgame-form',
  templateUrl: './add-boardgame-form.component.html',
  styleUrls: ['./add-boardgame-form.component.scss'],
})
export class AddBoardgameFormComponent implements OnInit {
  constructor(
    private gameServ: BoardgamesService,
    private bggGameServ: BggGameService,
    private authServ: AuthService
  ) {}

  @ViewChild('nameInput') nameInput?: ElementRef<HTMLInputElement>;
  boardgameType = BoardgameType;
  gameThumb?: string;
  searchResults?: Observable<BggGameShort[]>;
  bggGameName?: string;

  ngOnInit(): void {}

  addGame(form: NgForm) {
    const owner = this.authServ.getLoggedInUser();
    if (owner) {
      const name: string = form.value.name;
      const type: BoardgameType = form.value.type;
      const date: string = form.value.date;
      const timesPlayed: number = form.value.timesPlayed;
      const imageUrl = this.gameThumb;
      this.gameServ.addGame(
        new Boardgame(name, type, date, timesPlayed, owner, imageUrl)
      );
    }
  }

  searchBgg(form: NgForm) {
    const name: string = form.value.name;
    this.searchResults = this.bggGameServ.searchGamesByName(name);
  }

  onSelectFromBggSearch(searchResult: BggGameShort) {
    const id = searchResult.id;
    this.bggGameServ.getGameImgById(id).subscribe((imgUrl) => {
      this.gameThumb = imgUrl!;
      this.bggGameName = searchResult.name;
    });
  }
}

//todo
//add error handling to search
//open searh results list by default
