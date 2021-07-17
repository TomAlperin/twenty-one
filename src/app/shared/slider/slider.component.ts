import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, OnDestroy {
  showSlider = false;
  sliding = false;
  lastLeft = 0;
  btnLeft = 0;
  @Input() label = 'Slide to Delete';
  @Input() btnLabel = 'Delete';
  @Input() btnColor = 'primary';
  timeout: NodeJS.Timer;
  resetTimeout: NodeJS.Timer;
  destroyed$ = new Subject();
  @Output() slide = new EventEmitter<boolean>();
  @ViewChild('slider') private slider: ElementRef<HTMLDivElement>;

  constructor(private window: WindowService) {
    this.window.mousemove$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((event: MouseEvent) => this.doSlide(event));

    this.window.mousetouchend$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((event: MouseEvent) => this.endSlide());
  }

  ngOnInit(): void {
  }

  setSliding() {
    clearTimeout(this.timeout);
    clearTimeout(this.resetTimeout);
    this.sliding = true;
  }

  doSlide(event: MouseEvent) {
    if (this.slider) {
      const width = this.slider.nativeElement.offsetWidth - 64;

      if (this.sliding && this.lastLeft) {
        this.btnLeft += this.lastLeft - event.clientX;
        if (this.btnLeft > width) {
          this.btnLeft = width;
        } else if (this.btnLeft < 0) {
          this.btnLeft = 0;
        }
      }
      this.lastLeft = event.clientX;
    }
  }

  slid() {
    if (this.slider) {
      const width = this.slider.nativeElement.offsetWidth - 64;
      return this.btnLeft === width;
    } else {
      return false;
    }
  }

  endSlide() {
    if (this.slider) {
      if (this.sliding) {
        if (this.btnLeft === this.slider.nativeElement.offsetWidth - 64) {
          this.slide.emit(true);
          this.showSlider = false;
          clearTimeout(this.resetTimeout);
        } else {
          this.resetSlider();
        }
        this.timeout = setInterval(() => {
          this.btnLeft--;
          if (this.btnLeft <= 0) {
            clearTimeout(this.timeout);
          }
        }, 2);
        this.sliding = false;
      }
    }

    this.resetSlider();
  }

  resetSlider() {
    clearTimeout(this.resetTimeout);
    this.resetTimeout = setTimeout(() => {
      this.showSlider = false;
      this.btnLeft = 0;
    }, 4000);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
