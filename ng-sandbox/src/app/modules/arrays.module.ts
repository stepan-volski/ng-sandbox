import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArraysPageComponent } from '../components/arrays-page/arrays-page.component';
import { SharedModule } from './shared.module';

const routes: Routes = [
  { path: '', component: ArraysPageComponent },
];

@NgModule({
  declarations: [
    ArraysPageComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class ArraysModule { }
