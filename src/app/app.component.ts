import { ApplicationRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { get as _get } from 'lodash';
import { concat, interval, Subject } from 'rxjs';
import { map, first, mergeMap, filter } from 'rxjs/operators';
import { slideAnimation } from './animations';
import { SeoService } from '@services/seo.service';
import { SwUpdate } from '@angular/service-worker';
import { WindowService } from '@services/window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [slideAnimation]
})
export class AppComponent implements OnDestroy {
  destroyed$ = new Subject();

  constructor(
    private seo: SeoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private updates: SwUpdate,
    private appRef: ApplicationRef,
    private window: WindowService
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

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
