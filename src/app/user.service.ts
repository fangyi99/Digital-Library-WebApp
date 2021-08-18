import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:string = "http://localhost:3000/api/user";
  emailURL: string = "http://localhost:3000/api/forgot-password"
  resetPassURL: string = "http://localhost:3000/api/reset-password";

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllUsers(){
    return this.http.get<any[]>(this.url, {headers: this.authService.getTokenHeader()});
  }

  getUser(id){
    return this.http.get(this.url + '/' + id, {headers: this.authService.getTokenHeader()});
  }

  updateUser(id, data){
    return this.http.put<any[]>(this.url + "/" + id, data, {headers: this.authService.getTokenHeader()});
 }

 deleteUser(id){
  return this.http.delete<any[]>(this.url + '/' + id);
 }

 sendEmail(email){
  return this.http.put<any[]>(this.emailURL, {'email':email});
 }

 resetPassword(id, token, password){
   return this.http.put<any[]>(this.resetPassURL + '/' + id + '/' + token, {'password':password});
 }

}

