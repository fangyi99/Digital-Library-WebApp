import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-book-listing',
  templateUrl: './book-listing.component.html',
  styleUrls: ['./book-listing.component.css']
})
export class BookListingComponent implements OnChanges {

  category: string = 'All';
  books: any[];

  constructor(private route: ActivatedRoute, private bookService: BookService, public searchService: SearchService) {

    // if category is selected
    if(this.route.snapshot.params.category){
      this.category = this.route.snapshot.params.category;
      bookService.getBooksByCategory(this.category).subscribe( data => {
        this.books = data;
      });
    }
    else{
      bookService.getAllBooks().subscribe( data => {
        this.books = data;
      });
    }
  }

  ngOnInit(){}

  ngOnDestroy(){
    this.searchService.clear();
    location.reload();
  }

  ngOnChanges(){
  }

}
