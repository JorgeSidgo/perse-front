import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[onlyLetters]'
})
export class OnlyLettersDirective {

  private regex: RegExp = new RegExp(/^[a-zA-Z ]+$/);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

}
