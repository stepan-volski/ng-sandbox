import { NgModule } from '@angular/core';
import { FilterPipe, SearchPipe, SortPipe } from '../public-api';


@NgModule({
  declarations: [
    FilterPipe,
    SearchPipe,
    SortPipe
  ],
  imports: [
  ],
  exports: [
    FilterPipe,
    SearchPipe,
    SortPipe
  ]
})
export class GamePipesModule { }
