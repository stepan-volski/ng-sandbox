import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Boardgame } from '../models/boardgame';

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
    private snackBar: MatSnackBar
  ) {
    this.getGamesFromApi();
  }

  public getBoardgames() {
    return this.boardgames.slice();
  }

  public getGamesExportLink() {
    const json = JSON.stringify(this.boardgames);
    return this.sanitizer.bypassSecurityTrustUrl(
      'data:text/json;charset=UTF-8,' + encodeURIComponent(json)
    );
  }

  public addGame(game: Boardgame) {
    this.boardgames.push(game);
    this.http.put(this.gamesUrl, JSON.stringify(this.boardgames)).subscribe({
      next: () => {
        this.gamesChanged.next(this.boardgames.slice());
        this.snackBar.open('Game added!', undefined, { duration: 2000 });
      },
      error: (error) => {
        this.snackBar.open(
          "Can't add game due to error " + error.message,
          'Close'
        );
      },
    });
  }

  public updateGamesAfterImport(games: Boardgame[]) {
    this.boardgames = games;
    this.http.put(this.gamesUrl, JSON.stringify(games)).subscribe({
      next: () => {
        this.gamesChanged.next(games);
        this.snackBar.open('Games imported!', undefined, { duration: 2000 });
      },
      error: (error) => {
        this.snackBar.open(
          "Can't import games due to error " + error.message,
          'Close'
        );
      },
    });
  }

  private getGamesFromApi() {
    this.http.get<Boardgame[]>(this.gamesUrl).subscribe((games) => {
      this.boardgames = games;
      this.gamesChanged.next(this.boardgames.slice());
    });
  }
}
