import { Component, Input, EventEmitter, Output, OnDestroy, ViewChildren, QueryList, ApplicationRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Settings } from '@models/settings';
import { TwentyOneService } from '@services/twenty-one.service';
import { WindowService } from '@services/window.service';
import { concat, interval, Subject, Subscription } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { SettingsComponent } from '@shared/settings/settings.component';
import { MatTooltip } from '@angular/material/tooltip';
import { SwUpdate } from '@angular/service-worker';
import { UpdateNotesComponent } from '@shared/update-notes/update-notes.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  updateEvent: any;
  swUpdate = {
    name: 'Check For Update',
    icon: 'system_update',
    action: 'check-update',
    color: undefined
  };
  options = [
    {
      name: 'Home',
      icon: 'home',
      url: '/'
    },
    {
      name: 'Twenty One',
      iconImg: '/assets/img/twenty-one-icon.png',
      url: '/twenty-one'
    },
    {
      name: 'Solitaire',
      iconImg: '/assets/img/solitaire-icon.png',
      url: '/solitaire'
    },
    {
      name: 'FreeCell',
      iconImg: '/assets/img/solitaire-icon.png',
      url: '/free-cell'
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
  @Input() restartDisabled = false;
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
    private appRef: ApplicationRef,
    private updates: SwUpdate,
  ) {
    const appIsStable$ = appRef.isStable.pipe(first((isStable: boolean) => isStable === true));
    const everyHour$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everyHour$);

    everySixHoursOnceAppIsStable$.subscribe(() => updates.checkForUpdate());

    this.subScribeToSettings();
  }

  update = () => {
    setTimeout(() => {
      this.updates.activateUpdate().then(() => document.location.reload());
    }, 0);
  }

  async ngOnInit() {
    if (this.updates.isEnabled) {
      this.options.push(this.swUpdate);
      interval(60 * 60 * 1000).subscribe(() => this.updates.checkForUpdate()
        .then(() => { }));
    }

    this.updates.available.subscribe((event) => {
      this.window.loadComponent(UpdateNotesComponent, Object.assign({ cb: this.update }, event));
      this.updateEvent = event;
      this.swUpdate.name = 'Update Software';
      this.swUpdate.icon = 'update';
      this.swUpdate.action = 'update';
      this.swUpdate.color = 'warn';
    });
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
      case 'check-update':
        this.updates.checkForUpdate();
        break;
      case 'update':
        this.update();
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
