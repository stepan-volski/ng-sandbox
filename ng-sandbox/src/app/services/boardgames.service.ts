import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { Boardgame } from '../models/boardgame';
import { AddGame, DeleteGame, EditGame, SetGames } from '../store/boardgames.actions';
import { GamesState } from '../store/boardgames.reducer';
import { ToastMessageService } from './toast-message.service';

@Injectable({
  providedIn: 'root',
})
export class BoardgamesService {
  private boardgames!: Boardgame[];
  private gamesUrl = environment.gamesApiURL;

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private toastSrv: ToastMessageService,
    private store: Store<GamesState>,
  ) {
    this.store.subscribe(
      (state: any) => {
        this.boardgames = state.games.games;
      }
    );
  }

  public addGame(game: Boardgame) {
    const payload = [...this.boardgames, game];
    this.updateGamesOnApi(payload).subscribe(
      {
        next: () => {
          this.store.dispatch(new AddGame(game));
          this.toastSrv.showSuccessMessage('Game added!');
        },
        error: (error) => {
          this.toastSrv.showErrorMessage(error.message);
        },
      }
    );
  }

  public deleteGame(id: string) {
    const payload = this.boardgames.filter(game => game.id !== id);
    this.updateGamesOnApi(payload).subscribe(
      {
        next: () => {
          this.store.dispatch(new DeleteGame(id));
          this.toastSrv.showSuccessMessage('Game deleted!');
        },
        error: (error) => {
          this.toastSrv.showErrorMessage(error.message);
        },
      }
    );
  }

  public editGame(game: Boardgame){
    const index = this.boardgames.findIndex(e => e.id === game.id);
    const payload = [...this.boardgames];
    payload[index] = game;

    this.updateGamesOnApi(payload).subscribe(
      {
        next: () => {
          this.store.dispatch(new EditGame(game));
          this.toastSrv.showSuccessMessage('Game edited!');
        },
        error: (error) => {
          this.toastSrv.showErrorMessage(error.message);
        },
      }
    );
  }

  public fetchGames(){
    this.http.get<Boardgame[]>(this.gamesUrl).subscribe(
      {
        next: (games) => {
          this.store.dispatch(new SetGames(games));
        },
        error: (error) => {
          this.toastSrv.showErrorMessage(error.message);
        },
      }
    );
  }

  public importGames(games: Boardgame[]) {
    this.updateGamesOnApi(games).subscribe(
      {
        next: () => {
          this.store.dispatch(new SetGames(games));
          this.toastSrv.showSuccessMessage('Games imported!');
        },
        error: (error) => {
          this.toastSrv.showErrorMessage(error.message);
        },
      }
    );
  }

  private updateGamesOnApi(payload: Boardgame[]){
    return this.http.put(this.gamesUrl, JSON.stringify(payload));
  }

  public getGamesExportLink() {
    const json = JSON.stringify(this.boardgames);
    return this.sanitizer.bypassSecurityTrustUrl(
      'data:text/json;charset=UTF-8,' + encodeURIComponent(json)
    );
  }

}
