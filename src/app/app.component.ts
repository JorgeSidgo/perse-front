import { Component } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Persé';

  headerBarText: string;

  constructor() {
    this.headerBarText = 'Persé';
  }

  changeState(state: boolean): any {
    this.headerBarText = (!state) ? 'Persé' : 'P';
  }

}
