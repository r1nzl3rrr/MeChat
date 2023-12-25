import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { UsersService } from 'src/app/account/users.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent {
  user$ = this.usersService.currentUserProfile$;
  
  constructor(
    private accountService: AccountService, 
    private router: Router,
    private usersService: UsersService
  ) {}

  logout(){
    this.accountService.logout().subscribe({
      next: () => this.router.navigateByUrl('/account/login'),
      error: error => console.log(error)
    })
  }
}
