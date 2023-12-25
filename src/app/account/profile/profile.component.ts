import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { ImageUploadService } from './../image-upload.service';
import { User } from '@angular/fire/auth';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user$ = this.accountService.currentUser$;

  constructor(private accountService: AccountService, private imageUploadService: ImageUploadService, private toast: HotToastService){}

  uploadImage(event: any, user: User){
    this.imageUploadService.uploadImage(event.target.files[0], `images/profile/${user.uid}`).pipe(
      this.toast.observe({
        success: 'Image uploaded',
        loading: 'Uploading Image...',
        error: 'An error occured when uploading image'
      }),
      concatMap((photoURL) => this.accountService.updateProfileData({ photoURL }))
    ).subscribe();
  }
}
