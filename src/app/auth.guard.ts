import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  userId:any;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
   }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const permission = route.data["permission"];
      if (this.authService.getSecureToken()!=null && permission.only.includes(this.authService.getUserRole())) {
        return true;
      }
      else {
        //User will be redirected to home page if they visit any page that they are unauthorized to.
        alert("You are not authorized to access the page");
        this.router.navigateByUrl('/home');
      }
    } 
  }
