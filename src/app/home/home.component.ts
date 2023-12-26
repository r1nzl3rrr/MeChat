import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsersService } from '../account/users.service';
import { combineLatest, map, startWith, switchMap } from 'rxjs';
import { ProfileUser } from '../shared/models/user-profile';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  searchControl = new FormControl('');
  chatListControl = new FormControl('', {nonNullable: true});
  messageControl = new FormControl('');

  user$ = this.usersService.currentUserProfile$;

  users$ = combineLatest([this.usersService.allUsers$, this.user$, this.searchControl.valueChanges.pipe(startWith(''))]).pipe(
    map(([users, user, searchString]) => users.filter(u => u.displayName?.toLowerCase().includes((searchString ?? '').toLowerCase()) && u.uid !== user?.uid ))
  )

  myChats$ = this.chatService.myChats$;

  selectedChat$ = combineLatest([
    this.chatListControl.valueChanges,
    this.myChats$
  ])
  .pipe(
      map(([value, chats]) => chats.find((c) => c.id === value[0])
  ))

  messages$ = this.chatListControl.valueChanges.pipe(
    map(value => value[0]),
    switchMap(chatId => this.chatService.getChatMessages$(chatId))
  )

  constructor(private usersService: UsersService, private chatService: ChatService) {}

  createChat(otherUser: ProfileUser){
    this.chatService.createChat(otherUser).subscribe();
  }

  sendMessage() {
    const message = this.messageControl.value;
    const selectedChatId = this.chatListControl.value[0];
    
    if (message && selectedChatId) {
      this.chatService.addChatMessage(selectedChatId, message).subscribe();
      this.messageControl.setValue('');
    }
  }
}
