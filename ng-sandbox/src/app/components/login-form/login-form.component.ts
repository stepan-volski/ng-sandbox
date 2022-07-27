import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { LogInStart, SignUpStart } from 'src/app/store/auth.actions';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {type: 'login' | 'signup'},
    private store: Store,
    ) { }

  formType: 'login' | 'signup' = 'login';
  formText = 'Log in';

  ngOnInit(): void {
    this.formType = this.data.type;
    this.formText = this.formType === 'login' ? 'Log in' : 'Sign up';
  }

  onSubmit(form: NgForm){
    if (this.formType === 'login') {
      this.store.dispatch(new LogInStart({email: form.value.username, password: form.value.password}))
    } else {
      this.store.dispatch(new SignUpStart({email: form.value.username, password: form.value.password}))
    }
  }

}
