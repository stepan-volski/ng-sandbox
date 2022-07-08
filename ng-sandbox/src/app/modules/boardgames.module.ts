import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterPipe, GamePipesModule, SearchPipe } from 'game-pipes';
import { AddBoardgameFormComponent } from '../components/add-boardgame-form/add-boardgame-form.component';
import { BoardgamePageComponent } from '../components/boardgame-page/boardgame-page.component';
import { FileUploaderComponent } from '../components/file-uploader/file-uploader.component';
import { GameCardComponent } from '../components/game-card/game-card.component';
import { SharedModule } from './shared.module';

const routes: Routes = [
  { path: '', component: BoardgamePageComponent, },
];

@NgModule({
  declarations: [
    BoardgamePageComponent,
    AddBoardgameFormComponent,
    GameCardComponent,
    FileUploaderComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    GamePipesModule
  ],
  providers: []
})

export class BoardgamesModule { }
