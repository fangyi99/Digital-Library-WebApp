import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookmarkService } from '../bookmark.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  user: any = {};
  tempBookmark: any;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private bookmarkService: BookmarkService) {
    userService.getUser(this.route.snapshot.params.id).subscribe((data:any) => this.user = data);
   }

  ngOnInit(): void {
  }

  redirectToBook(book){
    this.router.navigateByUrl('/book/' + book._id);
  }

  onDeleteModal(bookmark){
    this.tempBookmark = bookmark;
  }

  deleteBookmark(book_id){
    this.bookmarkService.deleteBookmark(this.user._id, book_id).subscribe(results => {
      location.reload();
    });
  }

}
