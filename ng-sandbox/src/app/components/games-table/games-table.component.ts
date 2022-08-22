import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Boardgame } from 'src/app/models/boardgame';
import { UiService } from 'src/app/services/ui.service';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-games-table',
  templateUrl: './games-table.component.html',
  styleUrls: ['./games-table.component.scss'],
})
export class GamesTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  games: Boardgame[] = [];
  displayedColumns: string[] = ['name', 'type', 'timesPlayed', 'purchaseDate'];
  dataSource!: MatTableDataSource<Boardgame>;
  selectedGame: Boardgame | undefined;

  constructor(public uiServ: UiService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.games = state.games.games;
      this.dataSource = new MatTableDataSource(this.games);
      this.selectedGame = state.ui.selectedGame;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  selectGame(game: Boardgame) {
    this.uiServ.selectGame(game);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
