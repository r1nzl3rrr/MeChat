import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private accountService: AccountService, 
              private router: Router,
              private toast: HotToastService){}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  onSubmit(){
    if(!this.loginForm.valid){
      return;
    }

    const {email, password} = this.loginForm.value;
    if(email && password) this.accountService.login(email, password).pipe(
      this.toast.observe({
        success: 'Logged in successfully',
        loading: 'Logging in...',
        error: 'Wrong Email or Password'
      })
    ).subscribe({
      next: () => this.router.navigateByUrl(''),
      error: error => {
        console.log(error);
        this.email?.setErrors({ invalidCredentials: true });
        this.password?.setErrors({ invalidCredentials: true });
      }  
    });
  }
}
