import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/entity/Account';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent {

  title = 'Persé';
  email: string;
  userData: Account;

  headerBarText: string;

  constructor(
    private authService: AuthService
  ) {
    this.headerBarText = 'Persé';
    this.userData = this.authService.getToken();
    this.email = this.userData.email;
  }

  changeState(state: boolean): any {
    this.headerBarText = (!state) ? 'Persé' : 'P';
  }

  logout() {
    this.authService.logout();
  }

}
