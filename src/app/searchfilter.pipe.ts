import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  // books: any[] = [];

  // constructor(private bookService: BookService) {
  //   bookService.getAllBooks().subscribe((data: any) => this.books = data);
  //  }

  transform(books: any[], keyword: string): any[] {
    if(!books) return [];
    if(!keyword) return books;

    return books.filter(book => book.title.toLocaleLowerCase().includes(keyword.toLowerCase()));
  }


}
