import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo:'/games', pathMatch: 'full' },
  { path: 'games', loadChildren: () => import('./boardgames.module').then(x => x.BoardgamesModule) },
  { path: 'arrays', loadChildren: () => import('./arrays.module').then(x => x.ArraysModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
