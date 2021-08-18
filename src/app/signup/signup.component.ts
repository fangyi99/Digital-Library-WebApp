import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {



    this.registerForm = this.fb.group ({
      role: 'user',
      name: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
      });
       }

       onSubmit() {
      this.authService.register(this.registerForm.value.name,this.registerForm.value.email,
      this.registerForm.value.password, this.registerForm.value.role).subscribe();
      this.router.navigateByUrl('/login');
      alert("Registration successful.")
       }

  }
