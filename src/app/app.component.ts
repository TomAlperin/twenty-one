import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { get as _get } from 'lodash';
import { map, mergeMap, filter } from 'rxjs/operators';
import { slideAnimation } from './animations';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [slideAnimation]
})
export class AppComponent {

  constructor(
    private seo: SeoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => this.activatedRoute),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data),
    ).subscribe(data => {
      const seoData = data.seo;
      this.seo.updateTitle(seoData.title);
      this.seo.updateMetaTags(seoData.metaTags);
    });
  }

  getView(outlet) {
    return _get(outlet, 'activatedRouteData.view');
  }
}
