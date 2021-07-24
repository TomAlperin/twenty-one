import {
  Input,
  Directive,
  ElementRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';

// ** Focus on input on component load **
// <input
//     formControlName="item"
//     type="text"
//     appFocus
// >

@Directive({
  selector: '[appFocus]'
})

export class FocusDirective implements OnChanges {

  @Input() appFocus: boolean | '';

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.appFocus.currentValue !== changes.appFocus.previousValue) {
      if (this.appFocus || this.appFocus === '') {
        setTimeout(() => {
          this.elementRef.nativeElement.focus();
        }, 0);
      }
    }
  }
}
