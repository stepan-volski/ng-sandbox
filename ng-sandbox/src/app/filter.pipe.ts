import { Pipe, PipeTransform } from '@angular/core';
import { Boardgame } from './models/boardgame';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: Boardgame[], type: string): Boardgame[] {
    let result: Boardgame[] = [];

    switch(type){
       case 'euro': result = value.filter(e => e.type === 'euro');
       break;
       case 'amero': result = value.filter(e => e.type === 'amero');
       break;
       case 'party': result = value.filter(e => e.type === 'party');
       break;
       case 'all': result = value;
       break;
       default: result = value;
    }
    return result;
  }

}
