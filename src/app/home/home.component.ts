import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsersService } from '../account/users.service';
import { combineLatest, map, startWith } from 'rxjs';
import { ProfileUser } from '../shared/models/user-profile';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  searchControl = new FormControl('')

  user$ = this.usersService.currentUserProfile$;

  users$ = combineLatest([this.usersService.allUsers$, this.user$, this.searchControl.valueChanges.pipe(startWith(''))]).pipe(
    map(([users, user, searchString]) => users.filter(u => u.displayName?.toLowerCase().includes((searchString ?? '').toLowerCase()) && u.uid !== user?.uid ))
  )

  myChats$ = this.chatService.myChats$;

  constructor(private usersService: UsersService, private chatService: ChatService) {}

  createChat(otherUser: ProfileUser){
    this.chatService.createChat(otherUser).subscribe();
  }
}
