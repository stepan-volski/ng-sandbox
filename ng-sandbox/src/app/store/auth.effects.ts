import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  AuthFail,
  LogInStart,
  AuthSuccess,
  LOG_IN_START,
  SIGN_UP_START,
  AUTH_SUCCESS,
} from './auth.actions';
import { AuthResponseData } from '../models/authResponseData';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { ToastMessageService } from '../services/toast-message.service';
import { BoardgamesService } from '../services/boardgames.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOG_IN_START),
      switchMap((authData: LogInStart) => {
        const url = `${environment.firabaseLoginUrl}?key=${environment.firebaseApiKey}`;
        const payload = {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true,
        };
        return this.http.post<AuthResponseData>(url, payload).pipe(
          //move request to authService
          map((responseData) => {
            this.toastServ.showSuccessMessage('User logged in');
            const user = new User(
              responseData.email,
              responseData.localId,
              new Date().getTime()
            );
            localStorage.setItem('user', JSON.stringify(user));
            return new AuthSuccess(user);
          }),
          catchError((errorRes) => {
            this.toastServ.showErrorMessage(errorRes.error.error.message);
            return of(new AuthFail());
          })
        );
      })
    );
  });

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SIGN_UP_START),
      switchMap((authData: LogInStart) => {
        const url = `${environment.firebaseSignupUrl}?key=${environment.firebaseApiKey}`;
        const payload = {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true,
        };
        return this.http.post<AuthResponseData>(url, payload).pipe(
          //move request to authService
          map((responseData) => {
            this.toastServ.showSuccessMessage('New user created and logged in');
            const user = new User(
              responseData.email,
              responseData.localId,
              new Date().getTime()
            );
            localStorage.setItem('user', JSON.stringify(user));
            this.authService.addUserToApiUserList(user);
            return new AuthSuccess(user);
          }),
          catchError((errorRes) => {
            this.toastServ.showErrorMessage(errorRes.error.error.message);
            return of(new AuthFail());
          })
        );
      })
    );
  });

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
    private http: HttpClient,
    private toastServ: ToastMessageService,
    private gameService: BoardgamesService,
    private authService: AuthService
  ) {}
}
