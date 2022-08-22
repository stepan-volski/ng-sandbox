import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { first, tap } from 'rxjs/operators';
import { Boardgame } from '../models/boardgame';
import { UiService } from '../services/ui.service';
import { AppState } from './app.reducer';
import { EDIT_GAME, DELETE_GAME } from './boardgames.actions';

@Injectable()
export class UIEffects {
  edit$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(EDIT_GAME),
        tap((data: { payload: Boardgame }) => {
          this.store.pipe(first()).subscribe((state) => {
            if (
              state.ui.selectedGame &&
              data.payload.id === state.ui.selectedGame.id
            ) {
              this.uiServ.selectGame(data.payload);
            }
          });
        })
      );
    },
    { dispatch: false }
  );

  delete$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DELETE_GAME),
        tap((data: { payload: string }) => {
          this.store.pipe(first()).subscribe((state) => {
            if (
              state.ui.selectedGame &&
              data.payload === state.ui.selectedGame.id
            ) {
              this.uiServ.deselectGame();
            }
          });
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private uiServ: UiService,
    private store: Store<AppState>
  ) {}
}
