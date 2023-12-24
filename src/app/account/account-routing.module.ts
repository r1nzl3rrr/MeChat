import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

const redirectToHome = () => redirectLoggedInTo([''])

const routes: Routes = [
  {path: 'login', component: LoginComponent, ...canActivate(redirectToHome)},
  {path: 'register', component: RegisterComponent, ...canActivate(redirectToHome)}
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
