import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { filter, map, mergeAll, toArray } from 'rxjs/operators';
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
    const url = `${environment.firebaseMainUrl}/games/${game.id}.json`;
    this.http.put(url, payload).subscribe({
      next: () => {
        this.store.dispatch(new AddGame(game));
        this.toastSrv.showSuccessMessage('Game added!');
      },
      error: (error) => {
        this.toastSrv.showErrorMessage(error.message);
      },
    });
  }

  public lendGame(game: Boardgame) {
    this.editGame(game);
    this.toastSrv.showSuccessMessage('Game lent!');
  }

  public returnGame(game: Boardgame) {
    this.editGame(game);
    this.toastSrv.showSuccessMessage('Game returned!');
  }

  public deleteGame(id: string) {
    const url = `${environment.firebaseMainUrl}/games/${id}.json`;
    this.http.delete(url).subscribe({
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
    const payload = JSON.stringify(game);
    const url = `${environment.firebaseMainUrl}/games/${game.id}.json`;
    this.http.put(url, payload).subscribe({
      next: () => {
        this.store.dispatch(new EditGame(game));
        this.toastSrv.showSuccessMessage('Game updated!');
      },
      error: (error) => {
        this.toastSrv.showErrorMessage(error.message);
      },
    });
  }

  public getUserGames(userId: string) {
    const url = `${environment.firebaseMainUrl}/games.json`;
    this.http
      .get(url)
      .pipe(
        map((response) => Object.values(response || {}) as Boardgame[]),
        mergeAll(),
        filter(
          (game) => game.owner.id === userId || game.borrower?.id === userId
        ),
        toArray()
      )
      .subscribe({
        next: (games) => {
          this.store.dispatch(new SetGames(games));
        },
        error: (error) => {
          this.toastSrv.showErrorMessage(error.message);
        },
      });
  }

  public getGameById(id: string){
    const url = `${environment.firebaseMainUrl}/games/${id}.json`;
    return this.http.get<Boardgame>(url);
  }

  public importGames(games: Boardgame[]) {  //TODO need to specify business logic
    console.log('imported games:');
    console.log(games);
    this.toastSrv.showSuccessMessage('Feature temporary disabled!');
  }

  public getGamesExportLink() {
    const json = JSON.stringify(this.boardgames);
    return this.sanitizer.bypassSecurityTrustUrl(
      'data:text/json;charset=UTF-8,' + encodeURIComponent(json)
    );
  }
}
