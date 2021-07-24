import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TwentyoneSettings } from '@models/twentyone-settings';
import { SoundService } from '@services/sound.service';
import { TwentyOneService } from '@services/twenty-one.service';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.scss']
})
export class BlackjackComponent implements AfterViewInit, OnDestroy {
  settings: TwentyoneSettings;
  destroyed$ = new Subject();
  zoom = false;
  prop = '';

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
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
        this.renderer.removeChild(document.body, this.elRef.nativeElement);
        clearInterval(timer);
      }, 9000);
    }, 2000);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
