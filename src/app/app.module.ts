import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { SearchfilterPipe } from './searchfilter.pipe';

/* Navigation Components */
import { HeaderComponent } from './header/header.component'
import { UserSidenavComponent } from './user-sidenav/user-sidenav.component';

/* Components */
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { PostFeedbackComponent } from './post-feedback/post-feedback.component';
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { BookListingComponent } from './book-listing/book-listing.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookContentsComponent } from './book-contents/book-contents.component';
import { ProfileComponent } from './profile/profile.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { BookManagementComponent } from './book-management/book-management.component';
import { ViewFeedbackComponent } from './view-feedback/view-feedback.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

/* Services */
import { AuthService } from './auth.service';
import { BookService } from './book.service';
import { UserService } from './user.service';
import { BookmarkService } from './bookmark.service';
import { FeedbackService } from './feedback.service';
import { SearchService } from './search.service';
import { AdvancedSearchPipe } from './advanced-search.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserSidenavComponent,
    HomeComponent,
    PostFeedbackComponent,    
    LoginComponent,
    SignupComponent,
    BookListingComponent,
    BookDetailsComponent,
    BookContentsComponent,
    ProfileComponent,
    BookmarkComponent,
    UserListingComponent, 
    BookManagementComponent,    
    ViewFeedbackComponent,
    AdvancedSearchComponent,
    SearchfilterPipe,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AdvancedSearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthService, BookService, UserService, BookmarkService, FeedbackService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
