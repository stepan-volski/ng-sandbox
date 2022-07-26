import { InjectionToken, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBoardgameFormComponent } from '../components/add-boardgame-form/add-boardgame-form.component';
import { BoardgamePageComponent } from '../components/boardgame-page/boardgame-page.component';
import { FileUploaderComponent } from '../components/file-uploader/file-uploader.component';
import { GameCardComponent } from '../components/game-card/game-card.component';
import { FilterPipe } from '../filter.pipe';
import { SearchPipe } from '../search.pipe';
import { SharedModule } from './shared.module';
import { StoreModule } from "@ngrx/store";
import { boardgamesReducer } from '../store/boardgames.reducer';
import { SortPipe } from '../sort.pipe';
import { authReducer } from '../store/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../store/auth.effects';
import { EditBoardgameFormComponent } from '../components/edit-boardgame-form/edit-boardgame-form.component';

const routes: Routes = [
  { path: '', component: BoardgamePageComponent, },
];

const BOARDGAMES_REDUCER_TOKEN = new InjectionToken<any>('Boardgame Reducer');
const AUTH_REDUCER_TOKEN = new InjectionToken<any>('Auth Reducer');

@NgModule({
  declarations: [
    BoardgamePageComponent,
    AddBoardgameFormComponent,
    EditBoardgameFormComponent,
    GameCardComponent,
    FileUploaderComponent,
    FilterPipe,
    SearchPipe,
    SortPipe,
  ],
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
    }
  ]
})

export class BoardgamesModule { }
