import { AfterViewInit, ApplicationRef, Component, ComponentRef, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Settings } from '@models/settings';
import { SoundService } from '@services/sound.service';
import { TwentyOneService } from '@services/twenty-one.service';

@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  styleUrls: ['./win.component.scss']
})
export class WinComponent implements AfterViewInit, OnDestroy {
  settings: Settings;
  destroyed$ = new Subject();
  zoom = false;
  prop = '';
  @Input() winImage: string;
  @Input() componentRef: ComponentRef<WinComponent>;

  constructor(
    private appRef: ApplicationRef,
    private twentyone: TwentyOneService,
    private soundService: SoundService
  ) {
    this.twentyone.settings$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(settings => this.settings = settings);
  }

  ngAfterViewInit(): void {
    this.blackjack();
  }

  blackjack() {
    let i = 0;
    setTimeout(() => {
      if (this.settings.sounds !== 'off') {
        this.soundService.playSound('blackjack');
      }

      this.zoom = true;
      const timer = setInterval(() => {
        i++;
        switch (i) {
          case 1:
            this.prop = 'prop1';
            break;
          case 2:
            this.prop = 'prop2';
            break;
          default:
            this.prop = '';
            i = 0;
            break;
        }
      }, 10);
      setTimeout(() => {
        this.appRef.detachView(this.componentRef.hostView);
        this.componentRef.destroy();
        clearInterval(timer);
      }, 9000);
    }, 2000);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
