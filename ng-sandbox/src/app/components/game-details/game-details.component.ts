import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Boardgame } from 'src/app/models/boardgame';
import { BoardgameType } from 'src/app/models/boardgameType';
import { BoardgamesService } from 'src/app/services/boardgames.service';
import { AppState } from 'src/app/store/app.reducer';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss'],
})
export class GameDetailsComponent implements OnInit {
  game?: Boardgame;
  boardgameType = BoardgameType;
  videoURL: string = 'https://www.youtube.com/embed/1ozGKlOzEVc';
  safeURL: SafeResourceUrl = '';

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private gameService: BoardgamesService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.initGame();
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(
      this.videoURL
    );
  }

  initGame() {
    const isPreviewMode = this.route.snapshot.queryParams['preview'];
    const id = this.route.snapshot.paramMap.get('id');
    if (isPreviewMode) {
      this.gameService.getGameById(id!).subscribe((game) => (this.game = game));
    } else {
      this.store.select('games').subscribe((games) => {
        this.game = games.games.find((game) => game.id === id)!;
      });
    }
  }
}
