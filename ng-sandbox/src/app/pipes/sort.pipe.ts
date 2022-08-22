import { Pipe, PipeTransform } from '@angular/core';
import { Boardgame } from '../models/boardgame';

@Pipe({
  name: 'sort',
  pure: false,
})
export class SortPipe implements PipeTransform {

  transform(value: Boardgame[], sortType: string, sortDirection: 'asc' | 'desc'): Boardgame[] {
    let games = [...value];
    let result: Boardgame[] = [];

    switch (sortType) {
      case 'name':
        sortDirection === 'asc'
          ? result = games.sort((a, b) => a.name.localeCompare(b.name))
          : result = games.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'playTime':
        sortDirection === 'asc'
          ? result = games.sort((a, b) => a.timesPlayed - b.timesPlayed)
          : result = games.sort((a, b) => b.timesPlayed - a.timesPlayed);
        break;
      case 'date':
        sortDirection === 'asc'
          ? result = games.sort((a, b) => Date.parse(a.purchaseDate) - Date.parse(b.purchaseDate))
          : result = games.sort((a, b) => Date.parse(b.purchaseDate) - Date.parse(a.purchaseDate));
        break;
      case 'none':
        result = games;
        break;
    }

    return result;
  }

}
