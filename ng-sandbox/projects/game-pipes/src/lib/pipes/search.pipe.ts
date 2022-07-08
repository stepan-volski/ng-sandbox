import { Pipe, PipeTransform } from '@angular/core';
import { Boardgame } from '../../public-api';


@Pipe({
  name: 'search',
  pure: false,
})
export class SearchPipe implements PipeTransform {
  transform(value: Boardgame[], searchRequest: string): Boardgame[] {
    if (searchRequest) {
      return value.filter((e) => e.name.toLocaleLowerCase().includes(searchRequest.toLocaleLowerCase()));
    }
    return value;
  }
}
