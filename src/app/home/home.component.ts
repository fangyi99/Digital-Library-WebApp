import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  categories = [{
    "image": "assets/images/book.png",
    "name": "Books",
    "label": "book"
  },
  {
    "image": "assets/images/magazine.png",
    "name": "Magazines & Articles",
    "label": "magazine"
  },
  {
    "image": "assets/images/newspaper.png",
    "name": "Newspapers",
    "label": "newspaper"
  },
  {
    "image": "assets/images/journal.png",
    "name": "Journals",
    "label": "journal"
  }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
