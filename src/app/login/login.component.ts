import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  results: any = false;
  userId : String;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group ({
      name: '',
      password: ''
      });
    }

      onSubmit() {
        this.authService.login(this.loginForm.value.name,
        this.loginForm.value.password).subscribe(data => {
        this.results = data;
        if (this.results[0].auth)
        {
        sessionStorage.setItem("userId", this.results[0].id);
        this.authService.setSecureToken(this.results[0].token);
        this.authService.setUserRole(this.results[0].role);
        this.router.navigateByUrl('/profile/' + this.results[0].id);
        } else{
         alert("Wrong username or password")
         }
        });
         }
  }
