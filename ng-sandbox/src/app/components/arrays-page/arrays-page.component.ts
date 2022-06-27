import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ArraysService } from 'src/app/arrays.service';

@Component({
  selector: 'app-arrays-page',
  templateUrl: './arrays-page.component.html',
  styleUrls: ['./arrays-page.component.scss']
})
export class ArraysPageComponent implements OnInit {

  @ViewChild('arrInput') arrInput!: ElementRef;
  @ViewChild('sortType') sortType!: ElementRef;
  constructor(private arrServices: ArraysService) { }

  initialArray: number[] = [3, 9, 4, 5, 3, 1, 7];
  result: any;

  ngOnInit(): void {
  }

  onArraySubmit(){
    this.initialArray = this.arrInput.nativeElement.value.split(' ').map((e: string) => Number(e));
  }

  sortArray(form: NgForm){
    const type = form.value.sort === 'asc' ? true : false
    this.result = this.arrServices.sort(this.initialArray, type);
  }

  getBiggestNum() {
    this.result = this.arrServices.getBiggestNum(this.initialArray);
  }

  getSum() {
    this.result = this.arrServices.getSum(this.initialArray);
  }

  removeDupes() {
    this.result = this.arrServices.removeDupes(this.initialArray);
  }

  filterOddNums(){
    this.result = this.arrServices.filterOddNums(this.initialArray);
  }

}
