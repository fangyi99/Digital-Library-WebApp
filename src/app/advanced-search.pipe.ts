import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'advancedSearch'
})
export class AdvancedSearchPipe implements PipeTransform {

  transform(books:any[], filters:any){

    if(!books) return [];
    if(!filters) return books;

    var filteredBooks = [];
    // const keys = Object.keys(filters);
    // const filterBook = book => keys.every(key => book[key].toLocaleLowerCase().includes(filters[key].toLocaleLowerCase()));
    // return books.filter(filterBook);

    const keys = Object.keys(filters);
    const filterBook = book => {
      keys.every(key => book[key].toLocaleLowerCase().includes(filters[key].toLocaleLowerCase()));
      filteredBooks.push(books.filter(filterBook));
    }
    return filteredBooks;
  }
}

