import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any = {};
  updateAccountForm: FormGroup;

  constructor(private userService: UserService, private route: ActivatedRoute, private formBuilder: FormBuilder) { 
    userService.getUser(this.route.snapshot.params.id).subscribe((data:any) => this.user = data);
  }

  ngOnInit(): void {

    this.updateAccountForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required]
    });

  }

  onUpdateModal(user){
    //omitt patching of password field
    this.updateAccountForm.patchValue({
      username: user.username,
      email: user.email
    });
  }

  updateAccount() {
    var credentials:any;
    credentials = {
      username: this.updateAccountForm.value.username,
      email: this.updateAccountForm.value.email,
      password: this.updateAccountForm.value.password
    }

    this.userService.updateUser(this.user._id, credentials).subscribe(res => {
      this.userService.getUser(this.user._id).subscribe((data: any) => this.user = data);
      location.reload();
      alert("Profile updated successfully.")
    })
  }

}
