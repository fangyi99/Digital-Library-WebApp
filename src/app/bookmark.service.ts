import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BookmarkService {

  url:string = "http://localhost:3000/api/bookmark";

  constructor(private http: HttpClient) {
   }

  addBookmark(userId, book){
    return this.http.post<any[]>(this.url + '/' + userId + '/' + book._id, book);
   }

  deleteBookmark(userId, bookId){
    return this.http.delete<any[]>(this.url + '/' + userId + '/' + bookId);
  }

}
