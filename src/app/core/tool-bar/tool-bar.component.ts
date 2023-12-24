import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent {
  constructor(public accountService: AccountService, private router: Router) {

  }

  logout(){
    this.accountService.logout().subscribe({
      next: () => this.router.navigateByUrl('/account/login'),
      error: error => console.log(error)
    })
  }
}
