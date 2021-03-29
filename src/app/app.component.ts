import { Component, ViewEncapsulation } from '@angular/core';
import { get as _get } from 'lodash';
import { slideLeftAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [slideLeftAnimation]
})
export class AppComponent {

  getView(outlet) {
    return _get(outlet, 'activatedRouteData.view');
  }
}
