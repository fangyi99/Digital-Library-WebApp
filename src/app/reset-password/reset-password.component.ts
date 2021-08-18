import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  id: string;
  token: string;
  password: string;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params.id;
    this.token = this.route.snapshot.params.token;
   }

  ngOnInit(): void {
  }

  resetPassword(){
    this.userService.resetPassword(this.id, this.token, this.password).subscribe(res => {
      alert("Your password has been reset!");
      this.router.navigate(['/login']);
    });
  }

}
