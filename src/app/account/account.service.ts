import { Injectable } from '@angular/core';
import { Auth, UserInfo, authState, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Observable, concatMap, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) { }

  login(username: string, password: string){
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  register(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  updateProfileData(profileData: Partial<UserInfo>): Observable<any> {
    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap((user) => {
        if(!user) throw new Error('Not Authenticated');

        return updateProfile(user, profileData);
      })
    )
  }

  logout(){
    return from(this.auth.signOut());
  }

  forgotPassword(email: string) {
    return from(sendPasswordResetEmail(this.auth, email));
  }
}
