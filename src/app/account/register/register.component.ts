import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { switchMap } from 'rxjs';

export function passwordMatchValidation(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value

    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passwordNotMatch: true
      }
    }
    return null;
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit{

  complexPassword = "^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$"

  registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.complexPassword)]),
      confirmPassword: new FormControl('', Validators.required)
    },
    { validators: passwordMatchValidation() }
  );

  constructor(private accountService: AccountService, private toast: HotToastService, private router: Router, private usersService: UsersService) {}

  ngOnInit(): void {

  }

  onSubmit(){
    if(!this.registerForm.valid) return;

    const { name, email, password } = this.registerForm.value;
    if(name && email && password) {
      this.accountService.register(email, password).pipe(
        switchMap(({ user: { uid } }) => this.usersService.addUser({ uid, email, displayName: name })),
        this.toast.observe({
          success: 'Sign up successfully',
          loading: 'Signing up',
          error: 'Email already taken'
        })
      ).subscribe({
        next: () => this.router.navigateByUrl(''),
        error: error => {
          console.log(error);
          this.email?.setErrors({ emailExists: true });
        }
      })
    }
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
}
