import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-view-feedback',
  templateUrl: './view-feedback.component.html',
  styleUrls: ['./view-feedback.component.css']
})
export class ViewFeedbackComponent implements OnInit {

  feedbacks: any[] = [];
  tempFeedback: any;
  selected: string = '';

  constructor(private feedbackService: FeedbackService) {
    feedbackService.getAllFeedbacks().subscribe( data => this.feedbacks = data);
   }

  ngOnInit(): void {
  }

  //used for toggling contents of each feedback
  selectFeedback(id){
    this.selected = id;
  }

  onDeleteModal(feedback){
    this.tempFeedback = feedback;
  }

  deleteFeedback(feedback_id){
    this.feedbackService.deleteFeedback(feedback_id).subscribe(results => {
      location.reload();
    });
  }

}
