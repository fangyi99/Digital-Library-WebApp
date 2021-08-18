import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css']
})
export class UserListingComponent implements OnInit {

  users: any[] = [];
  tempUser: any;

  constructor(private userService: UserService) {
    userService.getAllUsers().subscribe( data => this.users = data);
   }

  ngOnInit(): void {
  }

  onDeleteModal(user){
    this.tempUser = user;
  }

  deleteUser(){
    this.userService.deleteUser(this.tempUser._id).subscribe(results => {
      location.reload();
    });
  }

}
