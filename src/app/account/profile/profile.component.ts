import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { ImageUploadService } from './../image-upload.service';
import { User } from '@angular/fire/auth';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap } from 'rxjs';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { UsersService } from '../users.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProfileUser } from 'src/app/shared/models/user-profile';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  user$ = this.usersService.currentUserProfile$;

  profileForm = this.fb.group({
    uid: [''],
    displayName: [''],
    firstName: [''],
    lastName: [''],
    phone: [''],
    address: [''],
  });

  constructor(
    private imageUploadService: ImageUploadService, 
    private toast: HotToastService,
    private usersService: UsersService,
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    this.usersService.currentUserProfile$.pipe(
      untilDestroyed(this)
    ).subscribe((user) => {
      this.profileForm.patchValue({ ...user });
    })
  }

  uploadImage(event: any, { uid }: ProfileUser){
    this.imageUploadService.uploadImage(event.target.files[0], `images/profile/${uid}`).pipe(
      this.toast.observe({
        success: 'Image uploaded',
        loading: 'Uploading Image...',
        error: 'An error occured when uploading image'
      }),
      concatMap((photoURL) => this.usersService.updateUser({ uid, photoURL }))
    ).subscribe();
  }

  saveProfile() {
    const { uid, ...data } = this.profileForm.value;

    if (!uid) {
      return;
    }

    this.usersService
      .updateUser({ uid, ...data })
      .pipe(
        this.toast.observe({
          loading: 'Saving profile data...',
          success: 'Profile updated successfully',
          error: 'There was an error in updating the profile',
        })
      )
      .subscribe();
  }
}
