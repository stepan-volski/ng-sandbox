import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginType } from 'src/app/models/loginType';
import { User } from 'src/app/models/user';
import { DialogService } from 'src/app/services/dialog.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { AppState } from 'src/app/store/app.reducer';
import { LogOut, SetUser } from 'src/app/store/auth.actions';
import { SetGames } from 'src/app/store/boardgames.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(
    private toastSrv: ToastMessageService,
    public dialogServ: DialogService,
    private store: Store<AppState>
  ) {}

  loggedInUser: User | null = null;
  loginType = LoginType;

  ngOnInit(): void {
    this.initUser();
    this.store.subscribe((state) => {
      this.loggedInUser = state.auth.user;
    });
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

  initUser() {
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
}
