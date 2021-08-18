import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchKeyword: string;
  searchFilters: Object;

  constructor() { }

  setKeyword(searchKeyword){
    this.searchKeyword = searchKeyword;
  }

  setFilters(searchFilters){
    this.searchFilters = searchFilters;
  }

  clear(){
    this.searchKeyword = '';
    this.searchFilters = {};
  }

}
