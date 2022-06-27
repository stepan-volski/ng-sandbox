import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArraysService {
  constructor() {}

  sort(arr: number[], isAscending: boolean) {
    if(isAscending){
      return arr.slice().sort((a, b) => a - b);
    }
    return arr.slice().sort((a, b) => b - a);
  }

  getBiggestNum(arr: number[]) {
    let biggest = 0;
    arr.forEach((e) => {
      if (e > biggest) {
        biggest = e;
      }
    });
    return biggest;
  }

  getSum(arr: number[]) {
    return arr.reduce((a, b) => a + b);
  }

  removeDupes(arr: number[]) {
    const result: number[] = [];
    arr.forEach((e) => {
      if (!result.includes(e)) {
        result.push(e);
      }
    });
    return result;
  }

  filterOddNums(arr: number[]){
    return arr.filter(e => e % 2 == 0);
  }
}
