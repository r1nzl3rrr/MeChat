import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { redirectLoggedInTo, canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ProfileComponent } from './profile/profile.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const redirectToHome = () => redirectLoggedInTo(['']);
const redirectToLogin = () => redirectUnauthorizedTo(['/account/login']);

const routes: Routes = [
  {path: 'profile', component: ProfileComponent, ...canActivate(redirectToLogin)},
  {path: 'login', component: LoginComponent, ...canActivate(redirectToHome)},
  {path: 'register', component: RegisterComponent, ...canActivate(redirectToHome)},
  {path: 'verify', component: VerifyEmailComponent, ...canActivate(redirectToHome)},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AccountRoutingModule { }
