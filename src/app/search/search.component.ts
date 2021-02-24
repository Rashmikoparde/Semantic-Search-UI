import { Component, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})


export class SearchComponent{
  
  searchResults;
  searchedQuery;

  @ViewChild('searchQuery') searchQuery : ElementRef;

  constructor(private apiService : ApiService)   { }
  
  onSearch() {
    this.searchedQuery = this.searchQuery.nativeElement.value;
    this.searchResults = [];
    this.apiService.getResults(this.searchedQuery).subscribe(data => {
      this.searchResults = data;
    } );
  }
}
