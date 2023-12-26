import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountModule } from '../account.module';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {
  verifyEmailControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private accountService: AccountService, private router: Router, private toast: HotToastService) {}

  sendVerification(){
    const email = this.verifyEmailControl.value;
    if(email) this.accountService.forgotPassword(email).pipe(
      this.toast.observe({
        success: 'Email Verification Sent',
        loading: 'Sending...',
        error: 'Something went wrong'
      })
    ).subscribe({
      next: () => this.router.navigateByUrl('/account/login'),
      error: error => console.log(error)
    })
  }
}
