import { Injectable } from '@angular/core';
import { merge } from 'rxjs';
import { fromEvent } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WindowService {
  mousedown$ = fromEvent(window, 'mouseup');
  touchstart$ = fromEvent(window, 'touchend');
  mousetouchstart$ = merge(this.mousedown$, this.touchstart$);

  mousemove$ = fromEvent(window, 'mousemove');
  mouseup$ = fromEvent(window, 'mouseup');
  touchend$ = fromEvent(window, 'touchend');
  mousetouchend$ = merge(this.mouseup$, this.touchend$);

  constructor() {
  }

}
