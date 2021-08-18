import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-sidenav',
  templateUrl: './user-sidenav.component.html',
  styleUrls: ['./user-sidenav.component.css']
})
export class UserSidenavComponent implements OnInit {

  user: any;
  id: String;
  role: String;

  constructor(private userService: UserService, private authService: AuthService, private route: ActivatedRoute) {
    userService.getUser(this.route.snapshot.params.id).subscribe((data:any) => {
      this.user = data;});
    this.id = authService.getUserId();
    this.role = authService.getUserRole();
   }

  ngOnInit(): void {
  }

}
