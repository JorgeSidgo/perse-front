import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/entity/Account';

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

  constructor() {
    this.headerBarText = 'Persé';
    this.userData = JSON.parse(window.localStorage.getItem('authentication'));
    this.email = this.userData.email;
  }

  changeState(state: boolean): any {
    this.headerBarText = (!state) ? 'Persé' : 'P';
  }

}
