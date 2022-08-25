import { InjectionToken, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AddBoardgameFormComponent } from '../components/add-boardgame-form/add-boardgame-form.component';
import { BoardgamePageComponent } from '../components/boardgame-page/boardgame-page.component';
import { EditBoardgameFormComponent } from '../components/edit-boardgame-form/edit-boardgame-form.component';
import { FileUploaderComponent } from '../components/file-uploader/file-uploader.component';
import { FiltersComponent } from '../components/filters/filters.component';
import { GameCardComponent } from '../components/game-card/game-card.component';
import { GameRowComponent } from '../components/game-row/game-row.component';
import { GamesTableComponent } from '../components/games-table/games-table.component';
import { FilterPipe } from '../pipes/filter.pipe';
import { SearchPipe } from '../pipes/search.pipe';
import { SortPipe } from '../pipes/sort.pipe';
import { AuthGuardService } from '../services/auth-guard.service';
import { AuthEffects } from '../store/auth.effects';
import { authReducer } from '../store/auth.reducer';
import { boardgamesReducer } from '../store/boardgames.reducer';
import { filtersReducer } from '../store/filters.reducer';
import { UIEffects } from '../store/ui.effects';
import { uiReducer } from '../store/ui.reducer';
import { SharedModule } from './shared.module';

const routes: Routes = [
  {
    path: '',
    component: BoardgamePageComponent,
    canActivate: [AuthGuardService],
  },
];

const BOARDGAMES_REDUCER_TOKEN = new InjectionToken<any>('Boardgame Reducer');
const AUTH_REDUCER_TOKEN = new InjectionToken<any>('Auth Reducer');
const UI_REDUCER_TOKEN = new InjectionToken<any>('UI Reducer');
const FILTERS_REDUCER_TOKEN = new InjectionToken<any>('Filters Reducer');

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
    FiltersComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('games', boardgamesReducer),
    StoreModule.forFeature('auth', authReducer),
    StoreModule.forFeature('ui', uiReducer),
    StoreModule.forFeature('filters', filtersReducer),
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
    },
    {
      provide: FILTERS_REDUCER_TOKEN,
      useFactory: () => filtersReducer,
    },
    AuthGuardService,
  ],
})
export class BoardgamesModule {}
