import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = 'search?search_query='
  constructor(private http : HttpClient) { }

  getResults(query: String) {
   return this.http.get(this.API_URL + query , {responseType : 'text'});
  }
}

