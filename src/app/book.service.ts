import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class BookService {

  categoryUrl: string = "http://localhost:3000/api/category"
  listingUrl: string = "http://localhost:3000/api/listing";
  bookUrl:string = "http://localhost:3000/api/book";

  constructor(private http: HttpClient) { }


  getAllBooks(){
    return this.http.get<any[]>(this.bookUrl);
  }

  getBooksByCategory(category){
    return this.http.get<any[]>(this.categoryUrl + '/' + category);
  }

  getBooksByQuery(query){
    return this.http.get<any[]>(this.listingUrl + '/' + query);
  }

  getBook(id){
    return this.http.get(this.bookUrl + '/' + id);
  }

  addBook(data) {
    return this.http.post<any[]>(this.bookUrl, data);
    }

  updateBook(id, data){
    return this.http.put<any[]>(this.bookUrl + "/" + id, data);
  }

  deleteBook(id){
    return this.http.delete<any[]>(this.bookUrl + '/' + id);
  }

  
}
