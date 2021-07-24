import { ApplicationRef, Component, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { merge } from 'rxjs';
import { fromEvent } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WindowService {
  mousedown$ = fromEvent(window, 'mousedown', { passive: true });
  touchstart$ = fromEvent(window, 'touchstart', { passive: true });
  mousetouchstart$ = merge(this.mousedown$, this.touchstart$);

  mousemove$ = fromEvent(window, 'mousemove');
  touchmove$ = fromEvent(window, 'touchmove');
  mousetouchmove$ = merge(this.mousemove$, this.touchmove$);

  mouseup$ = fromEvent(window, 'mouseup');
  touchend$ = fromEvent(window, 'touchend');
  mousetouchend$ = merge(this.mouseup$, this.touchend$);

  orientationchange$ = fromEvent(window, 'orientationchange');
  resize$ = fromEvent(window, 'resize');
  orientationresize$ = merge(this.orientationchange$, this.resize$);


  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {
  }

  loadComponent(component: any) {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector) as ComponentRef<Component>;

    Object.assign(componentRef.instance, {
      componentRef,
    });

    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  }
}
