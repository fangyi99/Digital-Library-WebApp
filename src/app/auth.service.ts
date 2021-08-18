import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  regUserUrl:string = "http://localhost:3000/api/reguser/";
  authuser:string = "http://localhost:3000/api/authuser/";

  constructor(private http: HttpClient) { }

  register(username: string, email:string, pw: string, role: string) {
    return this.http.post<any[]>(this.regUserUrl, { 'username': username, 'email': email,
   'password': pw, 'role': role });
    }

    login(username: string, pw: string) {
      return this.http.post<any[]>(this.authuser, { 'username': username,
     'password': pw });
    }

    getUserId(){
      return sessionStorage.getItem("userId");
    }

    getUserRole() {
      return sessionStorage.getItem("role")
    }

    setUserRole(role: string) {
      sessionStorage.setItem("role", role);
    }
      
      setSecureToken(secure_token: string) {
      sessionStorage.setItem("token", secure_token)
      }

      getSecureToken() {
      return sessionStorage.getItem("token")
      }

      getTokenHeader(){
        return new HttpHeaders().set('Authorization', 'Bearer' + this.getSecureToken());
      }
      
      logout() {
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
      }

    }