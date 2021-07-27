import { Component, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Settings } from '@models/settings';
import { TwentyOneService } from '@services/twenty-one.service';
import { WindowService } from '@services/window.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SettingsComponent } from 'src/app/twenty-one/settings/settings.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnDestroy {
  options = [
    // {
    //   name: 'Dashboard',
    //   icon: 'home',
    //   url: '/'
    // },
    {
      name: 'Twenty One',
      icon: 'style',
      url: '/'
    },
    {
      name: 'Solitaire',
      icon: 'style',
      url: '/solitaire'
    },
    { divider: true },
    {
      name: 'Settings',
      icon: 'settings',
      action: 'settings'
    },
    {
      name: 'Game Stats',
      icon: 'query_stats',
      action: 'stats'
    }
  ];
  settings: Settings;
  @Input() heading = '';
  @Input() controls: boolean & '';
  @Input() restart: boolean & '';
  @Input() hasStats = false;
  @Output() action = new EventEmitter<string>();
  destroyed$ = new Subject();

  constructor(
    private router: Router,
    private window: WindowService,
    private twentyone: TwentyOneService,
  ) {
    this.subScribeToSettings();
  }

  get url(): string {
    return this.router.url;
  }

  subScribeToSettings() {
    this.twentyone.settings$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((settings: Settings) => this.settings = settings);
  }


  doEvent(action: string) {
    switch (action) {
      case 'settings':
        this.window.loadComponent(SettingsComponent);
        break;
        break;
      case undefined:
        break;
      default:
        this.action.emit(action);
        break;
    }
  }

  trackByFn = (index: number) => index;

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
