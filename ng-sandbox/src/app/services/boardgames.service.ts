import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Boardgame } from '../models/boardgame';
import { ToastMessageService } from './toast-message.service';

@Injectable({
  providedIn: 'root',
})
export class BoardgamesService {
  private boardgames: Boardgame[] = [];
  public gamesChanged = new Subject<Boardgame[]>();
  private gamesUrl = environment.gamesApiURL;

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private toastSrv: ToastMessageService
  ) {
    this.getGamesFromApi();
  }

  public addGame(game: Boardgame) {   //move to id usage
    this.boardgames.push(game);
    this.updateGamesOnApi('Game added!');
  }

  public deleteGame(id: string){
    const game = this.getGameById(id);
    const index = this.boardgames.indexOf(game);
    this.boardgames.splice(index, 1);
    this.updateGamesOnApi('Game deleted!');
  }

  public editGame(editedGame: Boardgame){
    const game = this.getGameById(editedGame.id);
    const index = this.boardgames.indexOf(game);
    this.boardgames[index] = editedGame;
    this.updateGamesOnApi('Game edited!');
  }

  public importGames(games: Boardgame[]) {
    this.boardgames = games.slice();
    this.updateGamesOnApi('Games imported!');
  }

  private updateGamesOnApi(toastMessage: string){
    this.http.put(this.gamesUrl, JSON.stringify(this.boardgames)).subscribe(
      {
        next: () => {
          this.updateGamesOnMainPage();
          this.toastSrv.showSuccessMessage(toastMessage);
        },
        error: (error) => {
          this.toastSrv.showErrorMessage(error.message);
        },
      }
    );
  }

  private updateGamesOnMainPage(){
    this.gamesChanged.next(this.boardgames.slice());
  }

  public getBoardgames() {    //rename??
    return this.boardgames.slice();
  }

  public getGameById(id: string){
    return this.boardgames.filter(game => game.id === id)[0];
  }

  private getGamesFromApi() {
    this.http.get<Boardgame[]>(this.gamesUrl).subscribe((games) => {
      this.boardgames = games;
      this.gamesChanged.next(this.boardgames.slice());
    });
  }

  public getGamesExportLink() {
    const json = JSON.stringify(this.boardgames);
    return this.sanitizer.bypassSecurityTrustUrl(
      'data:text/json;charset=UTF-8,' + encodeURIComponent(json)
    );
  }
}


//todo
//edit icon
//edit screen
//delete function
//increase times played button
//add card id
