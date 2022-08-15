import { InjectionToken, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GameDetailsComponent } from '../components/game-details/game-details.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { AuthEffects } from '../store/auth.effects';
import { authReducer } from '../store/auth.reducer';
import { boardgamesReducer } from '../store/boardgames.reducer';
import { SharedModule } from './shared.module';

const routes: Routes = [{ path: '', component: GameDetailsComponent, canActivate: [AuthGuardService] }];

const BOARDGAMES_REDUCER_TOKEN = new InjectionToken<any>('Boardgame Reducer');
const AUTH_REDUCER_TOKEN = new InjectionToken<any>('Auth Reducer');

@NgModule({
  declarations: [GameDetailsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('games', boardgamesReducer),
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [
    {
      provide: BOARDGAMES_REDUCER_TOKEN,
      useFactory: () => boardgamesReducer,
    },
    {
      provide: AUTH_REDUCER_TOKEN,
      useFactory: () => authReducer,
    },
    AuthGuardService,
  ]
})
export class GameDetailsModule {}
