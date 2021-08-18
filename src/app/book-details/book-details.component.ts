import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BookService } from '../book.service';
import { BookmarkService } from '../bookmark.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: any = {};

  constructor(private bookService: BookService, private bookmarkService: BookmarkService,
    private route: ActivatedRoute, private router: Router, private authService: AuthService) { 
      bookService.getBook(this.route.snapshot.params.id).subscribe((data:any) => this.book = data);
  }

  addBookmark(){
    if(this.authService.getUserId()){
      var book:any;
      book = {
        _id: this.book._id,
        title: this.book.title,
        author: this.book.author,
        coverArt: this.book.coverArt,
        publisher: this.book.publisher,
        publicationDate: this.book.publicationDate,
        isbn: this.book.isbn,
        category: this.book.category,
        genre: this.book.genre,
        language: this.book.language,
        summary: this.book.summary,
        url: this.book.url
      }

      this.bookmarkService.addBookmark(this.authService.getUserId(), book).subscribe(data => alert("Item bookmarked."));
    }else{
      alert("Please log in first.");
    }
  }

  routeToContents(){
    if(this.authService.getUserId()){
    let navigationExtras: NavigationExtras = {
      queryParams: {url: this.book.url}
    }
    this.router.navigate(['read'], navigationExtras);
  }
    else{
          alert("Please log in first.");
    }
  }

  ngOnInit(): void {
  }

}
