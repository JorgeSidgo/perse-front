import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-full-menu',
  templateUrl: './full-menu.component.html',
  styleUrls: ['./full-menu.component.css']
})
export class FullMenuComponent implements OnInit {

  @Input() menuIsVisible: boolean;
  @Input() menuList: any[];
  @Output() menuState = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  closeMenu(): void {
    this.menuState.emit(false);
  }
}
