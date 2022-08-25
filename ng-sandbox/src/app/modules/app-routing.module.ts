import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/games', pathMatch: 'full' },
  {
    path: 'games',
    loadChildren: () =>
      import('./boardgames.module').then((x) => x.BoardgamesModule),
  },
  {
    path: 'game/:id',
    loadChildren: () =>
      import('./game-details.module').then((x) => x.GameDetailsModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login-page.module').then((x) => x.LoginPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
