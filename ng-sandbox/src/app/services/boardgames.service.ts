import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Boardgame } from '../models/boardgame';
import { User } from '../models/user';
import { AppState } from '../store/app.reducer';
import {
  AddGame,
  DeleteGame,
  EditGame,
  SetGames,
} from '../store/boardgames.actions';
import { ToastMessageService } from './toast-message.service';

@Injectable({
  providedIn: 'root',
})
export class BoardgamesService {
  private boardgames!: Boardgame[];
  loggedInUser: User | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private toastSrv: ToastMessageService,
    private store: Store<AppState>
  ) {
    this.store.subscribe((state: any) => {
      this.boardgames = state.games.games;
      this.loggedInUser = state.auth.user;
    });
  }

  public addGame(game: Boardgame) {
    const payload = JSON.stringify(game);
    const url = `${environment.firebaseMainUrl}/userData/${this.loggedInUser?.id}/games.json`;
    this.http.post(url, payload).subscribe({
      next: () => {
        this.store.dispatch(new AddGame(game));
        this.toastSrv.showSuccessMessage('Game added!');
      },
      error: (error) => {
        this.toastSrv.showErrorMessage(error.message);
      },
    });
  }

  public lendGame(game: Boardgame, userId: string) {
    const payload = JSON.stringify(game);
    const url = `${environment.firebaseMainUrl}/userData/${userId}/games.json`;

    this.http.post(url, payload).subscribe({
      next: (response: any) => {
        this.toastSrv.showSuccessMessage('Game lent!');
        const lentId = response.name;
        const updatedGame = {
          ...game,
          lentId,
        };
        this.editGame(updatedGame);
      },
      error: (error) => {
        this.toastSrv.showErrorMessage(error.message);
      },
    });
  }

  public returnGame(game: Boardgame) {
    const deleteUrl = `${environment.firebaseMainUrl}/userData/${game.lentToUser?.id}/games/${game.lentId}.json`;

    this.http.delete(deleteUrl).subscribe({
      next: () => {
        this.toastSrv.showSuccessMessage('Game returned!');
        const updatedGame = {
          ...game,
          lentFromUser: undefined,
          lentToUser: undefined,
          lentId: undefined,
        };
        this.editGame(updatedGame);
      },
      error: (error) => {
        this.toastSrv.showErrorMessage(error.message);
      },
    });
  }

  public deleteGame(id: string) {
    const payload = this.boardgames.filter((game) => game.id !== id);
    this.updateGamesOnApi(payload).subscribe({
      next: () => {
        this.store.dispatch(new DeleteGame(id));
        this.toastSrv.showSuccessMessage('Game deleted!');
      },
      error: (error) => {
        this.toastSrv.showErrorMessage(error.message);
      },
    });
  }

  public editGame(game: Boardgame) {
    const index = this.boardgames.findIndex((e) => e.id === game.id);
    const payload = [...this.boardgames];
    payload[index] = game;

    this.updateGamesOnApi(payload).subscribe({
      next: () => {
        this.store.dispatch(new EditGame(game));
        this.toastSrv.showSuccessMessage('Game updated!');
      },
      error: (error) => {
        this.toastSrv.showErrorMessage(error.message);
      },
    });
  }

  public fetchGames() {
    const url = `${environment.firebaseMainUrl}/userData/${this.loggedInUser?.id}/games.json`;
    this.http
      .get(url)
      .pipe(map((resp) => Object.values(resp || {}))) //convert firebase games object to Boardgame[]
      .subscribe({
        next: (games) => {
          this.store.dispatch(new SetGames(games));
        },
        error: (error) => {
          this.toastSrv.showErrorMessage(error.message);
        },
      });
  }

  public importGames(games: Boardgame[]) {
    this.updateGamesOnApi(games).subscribe({
      next: () => {
        this.store.dispatch(new SetGames(games));
        this.toastSrv.showSuccessMessage('Games imported!');
      },
      error: (error) => {
        this.toastSrv.showErrorMessage(error.message);
      },
    });
  }

  private updateGamesOnApi(payload: Boardgame[]) {
    const url = `${environment.firebaseMainUrl}/userData/${this.loggedInUser?.id}/games.json`;
    return this.http.put(url, JSON.stringify(payload));
  }

  public getGamesExportLink() {
    const json = JSON.stringify(this.boardgames);
    return this.sanitizer.bypassSecurityTrustUrl(
      'data:text/json;charset=UTF-8,' + encodeURIComponent(json)
    );
  }
}
