import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginType } from 'src/app/models/loginType';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    public dialogServ: DialogService
  ) {}

  loggedInUser: User | null = null;
  loginType = LoginType;

  ngOnInit(): void {
    this.authService.initUser();
    this.store.subscribe((state) => {
      this.loggedInUser = state.auth.user;
    });
  }

  login(type: LoginType) {
    this.dialogServ.openLogin(type);
  }

  logOut() {
    this.authService.logOut();
  }

}
