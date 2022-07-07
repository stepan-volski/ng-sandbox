import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBoardgameFormComponent } from '../components/add-boardgame-form/add-boardgame-form.component';
import { BoardgamePageComponent } from '../components/boardgame-page/boardgame-page.component';
import { FileUploaderComponent } from '../components/file-uploader/file-uploader.component';
import { GameCardComponent } from '../components/game-card/game-card.component';
import { FilterPipe } from '../filter.pipe';
import { SearchPipe } from '../search.pipe';
import { SharedModule } from './shared.module';

const routes: Routes = [
  { path: '', component: BoardgamePageComponent, },
];

@NgModule({
  declarations: [
    BoardgamePageComponent,
    FilterPipe,
    SearchPipe,
    AddBoardgameFormComponent,
    GameCardComponent,
    FileUploaderComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})

export class BoardgamesModule { }
