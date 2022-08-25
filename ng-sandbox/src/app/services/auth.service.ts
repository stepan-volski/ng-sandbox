import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../models/authResponseData';
import { User } from '../models/user';
import { AppState } from '../store/app.reducer';
import { AuthFail, AuthSuccess, LogOut, SetUser } from '../store/auth.actions';
import { SetGames } from '../store/boardgames.actions';
import { DeselectGame } from '../store/ui.actions';
import { DialogService } from './dialog.service';
import { ToastMessageService } from './toast-message.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedInUser: User | null = null;
  public redirectUrl: string = '';

  constructor(
    private toastSrv: ToastMessageService,
    private store: Store<AppState>,
    private http: HttpClient,
    public dialogServ: DialogService,
    private router: Router
  ) {
    this.store.subscribe((state) => {
      this.loggedInUser = state.auth.user;
    });
  }

  public initUser() {
    const data = localStorage.getItem('user');
    if (data) {
      const userData = JSON.parse(data);
      const user = new User(
        userData.email,
        userData.id,
        userData.createdDateStamp
      );
      if (user.isUserExpired()) {
        localStorage.removeItem('user');
      } else {
        this.store.dispatch(new SetUser(user));
      }
    }
  }

  public logIn(payload: any) {
    const url = `${environment.firabaseLoginUrl}?key=${environment.firebaseApiKey}`;
    this.http.post<AuthResponseData>(url, payload).subscribe({
      next: (responseData) => {
        this.toastSrv.showSuccessMessage('User logged in');
        const user = new User(
          responseData.email,
          responseData.localId,
          new Date().getTime()
        );
        localStorage.setItem('user', JSON.stringify(user));
        this.store.dispatch(new AuthSuccess(user));
        if (this.redirectUrl) {
          this.router.navigateByUrl(this.redirectUrl);
          this.redirectUrl = '';
        } else {
          this.router.navigate(['/games']);
        }
      },
      error: (error) => {
        this.toastSrv.showErrorMessage(error.error.error.message);
        this.store.dispatch(new AuthFail());
      },
    });
  }

  public signUp(payload: any) {
    const url = `${environment.firebaseSignupUrl}?key=${environment.firebaseApiKey}`;
    this.http.post<AuthResponseData>(url, payload).subscribe({
      next: (responseData) => {
        this.toastSrv.showSuccessMessage('New user created and logged in');
        const user = new User(
          responseData.email,
          responseData.localId,
          new Date().getTime()
        );
        localStorage.setItem('user', JSON.stringify(user));
        this.addNewUser(user);
        this.store.dispatch(new AuthSuccess(user));
        this.router.navigate(['/games']);
      },
      error: (error) => {
        this.toastSrv.showErrorMessage(error.error.error.message);
        this.store.dispatch(new AuthFail());
      },
    });
  }

  public logOut() {
    this.store.dispatch(new LogOut());
    localStorage.removeItem('user');
    this.loggedInUser = null;
    this.store.dispatch(new SetGames([]));
    this.store.dispatch(new DeselectGame());
    this.toastSrv.showSuccessMessage('User is logged out');
    this.router.navigate(['/login'])
  }

  public getUsers() {
    const url = `${environment.firebaseMainUrl}/users.json`;
    return this.http.get(url).pipe(map((resp) => Object.values(resp || {})));
  }

  private addNewUser(user: User) {
    const url = `${environment.firebaseMainUrl}/users/${user.id}.json`;
    const payload = JSON.stringify(user);
    this.http.put(url, payload).subscribe();
  }

  public getLoggedInUser() {
    return this.loggedInUser;
  }
}
