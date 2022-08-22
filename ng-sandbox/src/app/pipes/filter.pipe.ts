
import { Pipe, PipeTransform } from '@angular/core';
import { Boardgame } from '../models/boardgame';
import { BoardgameType } from '../models/boardgameType';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  boardgameType = BoardgameType;

  transform(value: Boardgame[], type: string): Boardgame[] {
    let result: Boardgame[] = [];

    switch(type){
      case this.boardgameType.Euro: result = value.filter(e => e.type === this.boardgameType.Euro);
      break;
      case this.boardgameType.Amero: result = value.filter(e => e.type === this.boardgameType.Amero);
      break;
      case this.boardgameType.Party: result = value.filter(e => e.type === this.boardgameType.Party);
      break;
      case 'all': result = value;
      break;
      default: result = value;
   }
    return result;
  }

}
