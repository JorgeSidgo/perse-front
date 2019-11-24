import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent {

  title = 'Persé';

  headerBarText: string;

  constructor() {
    this.headerBarText = 'Persé';
  }

  changeState(state: boolean): any {
    this.headerBarText = (!state) ? 'Persé' : 'P';
  }

}
