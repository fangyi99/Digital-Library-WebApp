import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  url: string = "http://localhost:3000/api/feedback";

  constructor(private http: HttpClient) { }

  getAllFeedbacks(){
    return this.http.get<any[]>(this.url);
  }

  postFeedback(email: string, subject: string, feedback: string) {
    return this.http.post<any[]>(this.url, {'email': email, 'subject': subject, 'feedback': feedback });
  }

  deleteFeedback(id){
      return this.http.delete<any[]>(this.url + '/' + id);
  }
}
