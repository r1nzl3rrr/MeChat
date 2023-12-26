import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'

const redirectToLogin = () => redirectUnauthorizedTo(['/account/login']);

const routes: Routes = [
  {path: '', component: HomeComponent, ...canActivate(redirectToLogin)},
  {path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
