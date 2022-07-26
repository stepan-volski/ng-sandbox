import { Injectable } from '@angular/core';
import { Actions, ofType, Effect, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthFail, LogInStart, AuthSuccess, LOG_IN_START, SIGN_UP_START } from './auth.actions';
import { AuthResponseData } from '../models/authResponseData';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { ToastMessageService } from '../services/toast-message.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LOG_IN_START),
        switchMap((authData: LogInStart) => {
          const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`;
          const payload = {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          };
          return this.http.post<AuthResponseData>(url, payload).pipe(
            map((responseData) => {
              this.toastServ.showSuccessMessage('User logged in');
              const user = new User(responseData.email, responseData.localId, new Date().getTime());
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
    }
  );

  signup$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SIGN_UP_START),
        switchMap((authData: LogInStart) => {
          const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ environment.firebaseApiKey }`;
          const payload = {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          };
          return this.http.post<AuthResponseData>(url, payload).pipe(
            map((responseData) => {
              this.toastServ.showSuccessMessage('New user created and logged in');
              const user = new User(responseData.email, responseData.localId, new Date().getTime());
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
    }
  );

  constructor(private actions$: Actions, private http: HttpClient, private toastServ: ToastMessageService) {}
}
