import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {

  searchForm: FormGroup;

  constructor(private searchService: SearchService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      title: new FormControl(''),
      author: new FormControl(''),
      publisher: new FormControl(''),
      publicationDate: new FormControl(''),
      category: new FormControl('')
    });
  }

  search(filters:any):void {
    Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
    this.searchService.setFilters(filters);
    this.router.navigate(['books']);
  }

}
