import { InjectionToken, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBoardgameFormComponent } from '../components/add-boardgame-form/add-boardgame-form.component';
import { BoardgamePageComponent } from '../components/boardgame-page/boardgame-page.component';
import { FileUploaderComponent } from '../components/file-uploader/file-uploader.component';
import { GameCardComponent } from '../components/game-card/game-card.component';
import { FilterPipe } from '../pipes/filter.pipe';
import { SearchPipe } from '../pipes/search.pipe';
import { SharedModule } from './shared.module';
import { StoreModule } from "@ngrx/store";
import { boardgamesReducer } from '../store/boardgames.reducer';
import { SortPipe } from '../pipes/sort.pipe';
import { authReducer } from '../store/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../store/auth.effects';
import { EditBoardgameFormComponent } from '../components/edit-boardgame-form/edit-boardgame-form.component';
import { GameRowComponent } from '../components/game-row/game-row.component';
import { GamesTableComponent } from '../components/games-table/games-table.component';
import { uiReducer } from '../store/ui.reducer';
import { UIEffects } from '../store/ui.effects';

const routes: Routes = [
  { path: '', component: BoardgamePageComponent, },
];

const BOARDGAMES_REDUCER_TOKEN = new InjectionToken<any>('Boardgame Reducer');
const AUTH_REDUCER_TOKEN = new InjectionToken<any>('Auth Reducer');
const UI_REDUCER_TOKEN = new InjectionToken<any>('UI Reducer');

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
    GameRowComponent,
    GamesTableComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('games', boardgamesReducer),
    StoreModule.forFeature('auth', authReducer),
    StoreModule.forFeature('ui', uiReducer),
    EffectsModule.forFeature([AuthEffects, UIEffects]),
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
    {
      provide: UI_REDUCER_TOKEN,
      useFactory: () => uiReducer,
    }
  ]
})

export class BoardgamesModule { }
