import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { BoardgamesService } from '../services/boardgames.service';
import {
  AUTH_SUCCESS,
  LogInStart,
  LOG_IN_START,
  SIGN_UP_START
} from './auth.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LOG_IN_START, SIGN_UP_START),
        tap((authData: LogInStart) => {
          const payload = {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          };
          authData.type === LOG_IN_START
            ? this.authService.logIn(payload)
            : this.authService.signUp(payload);
        })
      );
    },
    { dispatch: false }
  );

  updateUsers$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AUTH_SUCCESS),
        tap((data: { payload: User; type: string }) => {
          this.gameService.getUserGames(data.payload.id);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private gameService: BoardgamesService,
    private authService: AuthService
  ) {}
}
