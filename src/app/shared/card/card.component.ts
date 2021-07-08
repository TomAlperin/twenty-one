import { animate, AnimationBuilder, AnimationMetadata, style } from '@angular/animations';
import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Howl } from 'howler';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Settings } from 'src/app/models/settings';
import { TwentyOneService } from 'src/app/services/twenty-one.service';
const cardSuits = ['.8', '25.6', '50.4', '75.2', '99.9'];
const cardValues = ['', '0', '8.4', '16.7', '25', '33.3', '41.6', '49.9', '58.2', '66.5', '74.8', '83.1', '91.4', '99.7'];

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {
  suit: number;
  value: number;
  rand1 = (Math.random() * 300) - 150;
  rand2 = (Math.random() * 10) - 5;
  neat = false;
  cardStyles = {
    // Rotate cards to random positions
    transform: 'rotate(' + this.rand2 + 'deg) rotateY(0deg)',
    // card background
    backgroundPosition: '',
    position: 'relative',
    zIndex: 2,
  };
  backCardStyles = {
    // Rotate cards to random positions
    transform: 'rotate(' + this.rand2 + 'deg) rotateY(180deg)',
    // card background
    backgroundPosition: '0% 99.9%',
  };
  cardSize = false;
  destroyed$ = new Subject();

  @Input() public card: number | 'back' = 0;
  @Input() public cardSound = false;
  @Input() public animate = false;
  @Input() public flip = false;
  @Input() height = 100;

  constructor(
    private builder: AnimationBuilder,
    private el: ElementRef,
    private twentyone: TwentyOneService
  ) {
    this.subscribeToSettings();
  }

  ngOnInit(): void {
    if (this.card === 'back') {
      this.cardStyles.backgroundPosition = cardValues[1] + '% ' + cardSuits[4] + '%';
    } else {
      this.suit = this.card % 4;
      this.value = Math.floor(this.card / 4);
      this.cardStyles.backgroundPosition = cardValues[this.value] + '% ' + cardSuits[this.suit] + '%';
    }

    if (this.animate) {
      const metadata = this.slideIn();
      const factory = this.builder.build(metadata);
      const player = factory.create(this.el.nativeElement);
      player.play();

      if (this.card !== 0) {
        const sound = new Howl({
          src: ['/assets/snd/blackjack.mp3'],
          sprite: {
            cardSound: [0, 800],
          }
        });

        if (this.cardSound) {
          setTimeout(() => sound.play('cardSound'), 100);
        }
      }
    }
  }

  subscribeToSettings() {
    this.twentyone.settings$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(settings => {
        this.cardSize = settings.cardSize;

        if (settings.alignment === 'neat') {
          this.cardStyles.transform = 'rotateY(0deg)';
          this.backCardStyles.transform = ' rotateY(180deg)';
        } else {
          this.cardStyles.transform = 'rotate(' + this.rand2 + 'deg) rotateY(0deg)';
          this.backCardStyles.transform = 'rotate(' + this.rand2 + 'deg) rotateY(180deg)';
        }
      });
  }

  slideIn(): AnimationMetadata[] {
    return [
      style({ willChange: 'transform, opacity', opacity: 0, transform: 'translateY(-308px) rotate(' + this.rand1 + 'deg)' }),
      animate('180ms ease-in', style({ opacity: 1, transform: 'translateY(0) rotate(0deg)' })),
    ];
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
