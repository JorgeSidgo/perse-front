import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css']
})
export class PasswordInputComponent implements OnInit {

  @Input() formControlName: string;
  @Input() placeHolder: string;
  @Input() validationString: string;

  @Output() updatePass = new EventEmitter<string>();
  @Output() updatePassConf = new EventEmitter<string>();

  passValue: string;
  passConfValue: string;

  constructor() { }

  ngOnInit() {
  }

  emitPass(): void {
    this.updatePass.emit(this.passValue);
  }

  emitPassConf(): void {
    this.updatePass.emit(this.passValue);
  }

}
