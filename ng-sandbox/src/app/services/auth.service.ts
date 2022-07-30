import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginType } from '../models/loginType';
import { User } from '../models/user';
import { AppState } from '../store/app.reducer';
import { LogOut, SetUser } from '../store/auth.actions';
import { SetGames } from '../store/boardgames.actions';
import { DialogService } from './dialog.service';
import { ToastMessageService } from './toast-message.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private toastSrv: ToastMessageService,
    private store: Store<AppState>,
    private http: HttpClient,
    public dialogServ: DialogService
  ) {}

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

  login(type: LoginType) {
    this.dialogServ.openLogin(type);
  }

  logOut() {
    this.store.dispatch(new LogOut());
    localStorage.removeItem('user');
    this.store.dispatch(new SetGames([]));
    this.toastSrv.showSuccessMessage('User is logged out');
  }

  getUserListFromApi() {
    const url = `${environment.firebaseMainUrl}/users.json`;
    return this.http.get(url).pipe(map((resp) => Object.values(resp || {})));
  }

  addUserToApiUserList(user: User) {    //add error handling?
    const url = `${environment.firebaseMainUrl}/users.json`;
    const payload = JSON.stringify(user);
    this.http.post(url, payload).subscribe();
  }
}
