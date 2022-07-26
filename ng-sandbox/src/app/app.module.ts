import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AppRoutingModule } from './modules/app-routing.module';
import { SharedModule } from './modules/shared.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './store/auth.reducer';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginFormComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    StoreModule.forRoot(authReducer),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
