import { InjectionToken, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { FilterPipe, GamePipesModule, SearchPipe } from 'game-pipes';
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

const routes: Routes = [
  { path: '', component: BoardgamePageComponent, },
];

const BOARDGAMES_REDUCER_TOKEN = new InjectionToken<any>('Boardgame Reducer');

@NgModule({
  declarations: [
    BoardgamePageComponent,
    AddBoardgameFormComponent,
    GameCardComponent,
    FileUploaderComponent,
    FilterPipe,   //to be removed when gamePipesLib is connected
    SearchPipe,   //to be removed when gamePipesLib is connected
    SortPipe,     //to be removed when gamePipesLib is connected
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('games', boardgamesReducer),
    //GamePipesModule
  ],
  providers: [
    {
      provide: BOARDGAMES_REDUCER_TOKEN,
      useFactory: () => boardgamesReducer,
    }
  ]
})

export class BoardgamesModule { }
