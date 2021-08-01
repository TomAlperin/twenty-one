import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Settings } from '@models/settings';
import { TwentyOneService } from '@services/twenty-one.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  flip = false;
  timeout: NodeJS.Timer;
  backgroundPosition: string;
  prop: string;
  keyboardBackground: string;
  aboutColor: string;
  titleColor: string;
  menuColor1: string;
  menuColor2: string;
  settings: Settings;
  @ViewChild('aboutFront') private aboutFront: ElementRef;
  @ViewChild('keyboard') private keyboard: ElementRef;

  destroyed$ = new Subject();

  constructor(
    private location: Location,
    private twentyone: TwentyOneService,
  ) {
    this.subScribeToSettings();
  }

  ngOnInit(): void {
    this.menuColor1 = 'rgb(130, 132, 153)';
    this.timeout = this.animate();
  }

  subScribeToSettings() {
    this.twentyone.settings$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((settings: Settings) => this.settings = settings);
  }

  onScroll() {
    const kbPosition = this.keyboard.nativeElement.offsetTop - this.aboutFront.nativeElement.scrollTop;
    const aboutHeight = this.aboutFront.nativeElement.offsetHeight;
    const kbHeight = this.keyboard.nativeElement.offsetHeight;

    if (kbPosition > 0 - kbHeight && kbPosition < aboutHeight) {
      this.keyboardBackground = ((kbPosition + kbHeight) / ((aboutHeight + kbHeight) / 100)).toString() + '% 0';
    }
    else {
      this.keyboardBackground = '100% 0';
    }
  }

  work() {
    this.flip = true;

    let i = 50;
    const timer = setInterval(() => {
      const c = i.toString();
      this.aboutColor = 'rgb(' + c + ',' + c + ',' + c + ')';
      this.titleColor = 'rgb(' + i + ',' + i + ',' + i + ')';
      if (i >= 250) {
        this.menuColor1 = '';
        this.menuColor2 = 'rgb(130, 132, 153)';
        clearInterval(timer);
      }
      i = i + 20;
    }, 20);
  }

  play() {
    this.flip = false;

    let i = 250;
    const timer = setInterval(() => {
      this.aboutColor = 'rgb(' + i + ',' + i + ',' + i + ')';
      this.titleColor = 'rgb(' + i + ',' + i + ',' + i + ')';
      if (i <= 50) {
        this.menuColor1 = 'rgb(130, 132, 153)';
        this.menuColor2 = '';
        clearInterval(timer);
      }
      i = i - 20;
    }, 20);
  }

  animate() {
    let i = 0;
    let j = 0;
    return setInterval(() => {
      i++;
      j = j - .03;
      this.backgroundPosition = j + 'vw';

      if (j <= -100) { j = .06; }
      switch (i) {
        case 1:
          this.prop = 'prop1';
          break;
        case 2:
          this.prop = 'prop2';
          break;
        case 3:
          this.prop = 'prop';
          i = 0;
          break;
      }
    }, 10);
  }

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    clearTimeout(this.timeout);
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
