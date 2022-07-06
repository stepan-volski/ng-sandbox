import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { Boardgame } from '../models/boardgame';

@Injectable({
  providedIn: 'root'
})
export class BoardgamesService{

  private boardgames: Boardgame[] = [];
  public gamesChanged = new Subject<Boardgame[]>();
  private gamesUrl = "https://angular-test-987db-default-rtdb.firebaseio.com/games.json";

  constructor(private sanitizer: DomSanitizer, private http: HttpClient) {
    this.getGamesFromApi()
   }

  public getBoardgames(){
    return this.boardgames.slice();
  }

  public getGamesExportLink() {
    const json = JSON.stringify(this.boardgames);
    return this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(json));
  }

  public addGame(game: Boardgame){
    this.boardgames.push(game);
    this.http.put(this.gamesUrl, JSON.stringify(this.boardgames)).subscribe();
    this.gamesChanged.next(this.boardgames.slice());
  }

  public updateGamesAfterImport(games: Boardgame[]){
    this.boardgames = games;
    this.http.put(this.gamesUrl, JSON.stringify(games)).subscribe();
    this.gamesChanged.next(games);
  }

  private getGamesFromApi(){
    this.http
    .get<Boardgame[]>(this.gamesUrl)
    .subscribe(games => {
      this.boardgames = games;
      this.gamesChanged.next(this.boardgames.slice());
    });
  }

}
