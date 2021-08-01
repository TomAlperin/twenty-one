import { Component, Input, EventEmitter, Output, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { Settings } from '@models/settings';
import { TwentyOneService } from '@services/twenty-one.service';
import { WindowService } from '@services/window.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SettingsComponent } from '@shared/settings/settings.component';
import { MatTooltip } from '@angular/material/tooltip';

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
    },
    {
      name: 'About',
      iconImg: '/assets/img/tt-logo.png',
      url: '/about'
    }
  ];
  settings: Settings;
  @Input() heading = '';
  @Input() controls: boolean & '';
  @Input() restart: boolean & '';
  @Input() hasStats = false;
  @Input() tooltips: MatTooltip[] = [];
  @Output() action = new EventEmitter<string>();
  helptimer: NodeJS.Timer;
  helpTimerSub = new Subscription();
  touchMoveSub = new Subscription();
  navTooltips: MatTooltip[] = [];
  @ViewChildren('tooltip') set itemContent(content: QueryList<MatTooltip>) {
    this.navTooltips = content ? content.map(item => item) : [];
  }

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

  subscribeToTouchMove() {
    this.touchMoveSub = this.window.mousetouchend$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((event: MouseEvent & TouchEvent) => {
        if (this.settings.toolTips) {
          this.window.helpTime();
        }
      });
  }

  subScribeToSettings() {
    this.twentyone.settings$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((settings: Settings) => {
        this.settings = settings;

        this.helpTimerSub.unsubscribe();
        this.touchMoveSub.unsubscribe();
        if (settings.toolTips) {
          this.subscribeToTouchMove();
          this.helpTimerSub = this.window.helptimer$
            .pipe(takeUntil(this.destroyed$))
            .subscribe(async (setTimer: boolean) => {
              clearInterval(this.helptimer);
              if (setTimer) {
                const tips = [...this.navTooltips, ...this.tooltips];
                tips.forEach(tip => tip.hide());
                let i = 0;

                this.helptimer = setInterval(() => {
                  if (tips[i - 1]) {
                    tips[i - 1].hide();
                  }

                  if (tips[i]) {
                    tips[i].show();
                    i++;
                  } else {
                    clearInterval(this.helptimer);
                  }
                }, 3000);
              }
            });
          this.window.helpTime();
        } else {
          this.window.stopTimer();
        }
      });
  }


  doEvent(action: string) {
    switch (action) {
      case 'settings':
        this.window.loadComponent(SettingsComponent);
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
