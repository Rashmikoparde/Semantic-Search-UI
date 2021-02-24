import { Component, OnInit, Input, HostListener, NgZone, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})


export class ResultComponent {
  
  @ViewChild('firstSeeMore') firstSeeMore : ElementRef;

  @Input('searchedQuery') searchedQuery : string;
  
  clicked_book_index;
  results;
  
  @Input('searchResults')
  set searchResults(value) {

    this.clicked_book_index = -1;
    this.results = [];
    console.log(value, 'I got it')
    if(!value) return
    value = JSON.parse(value)
    value.forEach((result, rank) => {
        this.results.push(result);
    });
 
    console.log(this.results)

  }

  constructor(
  ) { }
  
  seeMoreDetails(clicked_book_index) {
    this.clicked_book_index = clicked_book_index;
  }

  collapseSeeMore() {
    this.clicked_book_index = -1;
  }
  
 }
