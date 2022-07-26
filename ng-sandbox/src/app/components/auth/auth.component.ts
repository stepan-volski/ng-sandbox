import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { DialogService } from 'src/app/services/dialog.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { AppState } from 'src/app/store/app.reducer';
import { LogOut } from 'src/app/store/auth.actions';

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

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.loggedInUser = state.auth.user;
    });
  }

  login(type: 'login' | 'signup') {
    this.dialogServ.openLogin(type);
  }

  logOut() {
    this.store.dispatch(new LogOut());
    this.toastSrv.showSuccessMessage('User is logged out');
  }
}
