import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
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
    public dialogServ: DialogService,
  ) { }

  public initUser() {
    const data = localStorage.getItem('user');
    if (data) {
      const userData = JSON.parse(data);
      const user = new User(userData.email, userData.id, userData.createdDateStamp);
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

}
