import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BggGameShort } from '../models/bggGameShort';

@Injectable({
  providedIn: 'root',
})
export class BggGameService {
  constructor(private http: HttpClient) {
    this.parser = new DOMParser();
  }

  parser: DOMParser;

  public searchGamesByName(query: string) {
    const url = `https://boardgamegeek.com/xmlapi2/search?query=${query}&type=boardgame`;
    return this.http.get(url, { responseType: 'text' }).pipe(
      map((resp) => {
        const doc = this.parser.parseFromString(resp, 'text/xml');
        const results = doc.getElementsByTagName('item');
        return this.convertSearchResultsToObjects(results);
      })
    );
  }

  // public getGameImgById(id: string) {
  //   const url = `https://boardgamegeek.com/xmlapi2/thing?id=${id}`;
  //   return this.http.get(url, { responseType: 'text' }).pipe(
  //     map((resp) => {
  //       const doc = this.parser.parseFromString(resp, 'text/xml');
  //       return doc.getElementsByTagName('thumbnail')[0].textContent;
  //     })
  //   );
  // }

  public getGameById(id: string) {
    const url = `https://boardgamegeek.com/xmlapi2/thing?id=${id}`;
    return this.http.get(url, { responseType: 'text' }).pipe(
      map((resp) => {
        return this.parser.parseFromString(resp, 'text/xml');
        //return doc.getElementsByTagName('thumbnail')[0].textContent;
      })
    );
  }

  private convertSearchResultsToObjects(items: HTMLCollectionOf<Element>) {
    const results: BggGameShort[] = [];
    if (items.length > 0) {
      Array.from(items).forEach((item) => {
        const id = item.id;
        const name =
          item.getElementsByTagName('name')[0].attributes[1].textContent;
        results.push(new BggGameShort(id, name!));
      });
    }
    return results;
  }
}
