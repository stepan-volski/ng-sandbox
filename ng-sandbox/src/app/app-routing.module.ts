import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArraysPageComponent } from './components/arrays-page/arrays-page.component';
import { BoardgamePageComponent } from './components/boardgame-page/boardgame-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';

const routes: Routes = [
  { path: '', component: BoardgamePageComponent, pathMatch: 'full'  },
  { path: 'games', component: BoardgamePageComponent, },
  { path: 'arrays', component: ArraysPageComponent  },
  { path: 'home', component: MainPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
