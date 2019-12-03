import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css']
})
export class PasswordInputComponent implements OnInit {

  @Input() formControlName: string;
  @Input() placeHolder: string;
  @Input() validationString: string;

  constructor() { }

  ngOnInit() {
  }

}
