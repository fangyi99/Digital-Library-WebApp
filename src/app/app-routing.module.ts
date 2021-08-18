import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './auth.guard';

/*Components*/
import { HomeComponent } from './home/home.component';
import { PostFeedbackComponent } from './post-feedback/post-feedback.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
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

const routes: Routes = [
{path: '', redirectTo: 'home', pathMatch: 'full'},
{path: 'home', component: HomeComponent},
{path: 'login', component: LoginComponent},
{path: 'signup', component: SignupComponent},
{path: 'search', component: AdvancedSearchComponent},
{path: 'books', component: BookListingComponent},
{path: 'books/:category', component: BookListingComponent},
{path: 'book/:id', component: BookDetailsComponent},
{path: 'read', component: BookContentsComponent},
{path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard], data:
{permission: {only: ["user", "admin"]}}},
{path: 'bookmarks/:id', component: BookmarkComponent , canActivate: [AuthGuard], data:
{permission: {only: ["user", "admin"]}}},
{path: 'users/:id', component: UserListingComponent, canActivate: [AuthGuard], data:
{permission: {only: ["admin"]}}},
{path: 'manage-resources/:id', component: BookManagementComponent, canActivate: [AuthGuard], data:
{permission: {only: ["admin"]}}},
{path: 'feedbacks/:id', component: ViewFeedbackComponent , canActivate: [AuthGuard], data:
{permission: {only: ["user", "admin"]}}},
{path: 'feedback', component: PostFeedbackComponent},
{path: 'forgot-password', component: ForgotPasswordComponent},
{path: 'reset-password/:id/:token', component: ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);
