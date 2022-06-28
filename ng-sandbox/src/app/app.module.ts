import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ArraysPageComponent } from './components/arrays-page/arrays-page.component';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { BoardgamePageComponent } from './components/boardgame-page/boardgame-page.component';
import { FilterPipe } from './filter.pipe';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddBoardgameFormComponent } from './components/add-boardgame-form/add-boardgame-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import { GameCardComponent } from './components/game-card/game-card.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ArraysPageComponent,
    BoardgamePageComponent,
    FilterPipe,
    AddBoardgameFormComponent,
    GameCardComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatRadioModule,
    FormsModule,
    MatCardModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
