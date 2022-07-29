import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { LoginType } from 'src/app/models/loginType';
import { LogInStart, SignUpStart } from 'src/app/store/auth.actions';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {type: LoginType},
    private store: Store,
    ) { }

  formType: LoginType = LoginType.Login;

  ngOnInit(): void {
    this.formType = this.data.type;
  }

  onSubmit(form: NgForm){
    if (this.formType === LoginType.Login) {
      this.store.dispatch(new LogInStart({email: form.value.username, password: form.value.password}))
    } else {
      this.store.dispatch(new SignUpStart({email: form.value.username, password: form.value.password}))
    }
  }

}
