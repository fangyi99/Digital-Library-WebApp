import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-post-feedback',
  templateUrl: './post-feedback.component.html',
  styleUrls: ['./post-feedback.component.css']
})
export class PostFeedbackComponent implements OnInit {

  feedbackForm: FormGroup;

  constructor(private feedbackService: FeedbackService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      email: ['', [Validators.email]],
      subject: ['', [Validators.required, Validators.maxLength(30)]],
      feedback: ['', [Validators.required]]
      });
  }

  onSubmit(){
    this.feedbackService.postFeedback(this.feedbackForm.value.email,
   this.feedbackForm.value.subject, this.feedbackForm.value.feedback).subscribe(results => {
    location.reload();
    });
    }

}
