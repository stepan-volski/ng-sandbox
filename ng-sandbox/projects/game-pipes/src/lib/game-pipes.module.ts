import { NgModule } from '@angular/core';
import { FilterPipe, SearchPipe } from '../public-api';


@NgModule({
  declarations: [
    FilterPipe,
    SearchPipe,
  ],
  imports: [
  ],
  exports: [
    FilterPipe,
    SearchPipe,
  ]
})
export class GamePipesModule { }
