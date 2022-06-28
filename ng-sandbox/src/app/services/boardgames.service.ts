import { Injectable, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { boardgames } from '../data/boardgames';
import { Boardgame } from '../models/boardgame';

@Injectable({
  providedIn: 'root'
})
export class BoardgamesService implements OnInit{

  private boardgames: Boardgame[];
  public gamesChanged = new Subject<Boardgame[]>();

  constructor(private sanitizer: DomSanitizer) {
    this.boardgames = boardgames;
   }

  ngOnInit(): void {}

  getBoardgames(){
    return this.boardgames.slice();
  }

  addGame(game: Boardgame){
    this.boardgames.push(game);
    this.gamesChanged.next(this.boardgames.slice());
  }

  getJsonExportLink() {
    var theJSON = JSON.stringify(this.boardgames);
    return this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
  }

}
