import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { BookService } from '../book.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  searchInput: any;

  constructor(public router: Router, public auth: AuthService, 
    private bookService: BookService, private searchService: SearchService) {
     }

  ngOnInit(): void {
  }

  search(){
    if(this.router.url != 'books/:category'){
      this.router.navigate(['books']);
    }
    this.searchService.setKeyword(this.searchInput);
  }

}
