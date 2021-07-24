import { animate, AnimationBuilder, AnimationMetadata, style } from '@angular/animations';
import { Component, ElementRef, Input, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Settings } from '@models/settings';
import { SoundService } from '@services/sound.service';
import { TwentyOneService } from '@services/twenty-one.service';
const cardSuits = ['.8', '25.6', '50.4', '75.2', '99.9'];
const cardValues = ['', '0', '8.4', '16.7', '25', '33.3', '41.6', '49.9', '58.2', '66.5', '74.8', '83.1', '91.4', '99.7'];

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges, OnDestroy {
  suit: number;
  value: number;
  rand1 = (Math.random() * 300) - 150;
  rand2 = (Math.random() * 10) - 5;
  cardStyles = {
    // Rotate cards to random positions
    transform: 'rotate(' + this.rand2 + 'deg) rotateY(0deg)',
    // card background
    backgroundPosition: '0% 99.9%',
    position: 'relative',
    zIndex: 2,
  };
  backCardStyles = {
    // Rotate cards to random positions
    transform: 'rotate(' + this.rand2 + 'deg) rotateY(180deg)',
    // card background
    backgroundPosition: '0% 99.9%',
  };
  hoverFlip = false;
  settings = new Settings();
  flipTimeout: NodeJS.Timer;
  destroyed$ = new Subject();

  @Input() public card: number | 'back' = 0;
  @Input() public cardSound: boolean | '' = false;
  @Input() public animate: boolean | '' = false;
  @Input() public flip = false;
  @Input() height: number;
  @Input() width: number;
  @Input() neat: boolean | '' = false;
  @Input() pos = 'absolute';
  @Input() column: number;
  @Output() cardClick = new EventEmitter<boolean>();

  constructor(
    private builder: AnimationBuilder,
    private el: ElementRef,
    private twentyone: TwentyOneService,
    private soundService: SoundService
  ) {
  }

  async ngOnInit() {
    this.subscribeToSettings();
    this.setCard();

    if (this.twentyone.animate || (this.animate || this.animate === '')) {
      const metadata = this.slideIn();
      const factory = this.builder.build(metadata);
      const player = factory.create(this.el.nativeElement);
      player.play();
    }

    if (this.card !== 0 && (this.cardSound || this.cardSound === '')) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      this.soundService.playSound('card-sound');
    }
  }

  setCard() {
    if (this.card === 'back' || this.flip) {
      this.cardStyles.backgroundPosition = cardValues[1] + '% ' + cardSuits[4] + '%';
    } else {
      this.suit = this.card % 4;
      this.value = Math.floor(this.card / 4);
      this.cardStyles.backgroundPosition = cardValues[this.value] + '% ' + cardSuits[this.suit] + '%';
    }
  }

  // @HostListener('click', ['$event'])
  // flipCard(event: MouseEvent) {
  //   clearTimeout(this.flipTimeout);
  //   this.hoverFlip = !this.hoverFlip;

  //   this.flipTimeout = setTimeout(() => {
  //     this.hoverFlip = false;
  //   }, 3000);
  // }

  click() {
    this.cardClick.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.flip) {
      if (this.flip || this.card === 'back') {
        this.cardStyles.backgroundPosition = cardValues[1] + '% ' + cardSuits[4] + '%';
      } else {
        this.suit = this.card % 4;
        this.value = Math.floor(this.card / 4);
        this.cardStyles.backgroundPosition = cardValues[this.value] + '% ' + cardSuits[this.suit] + '%';
      }
    }

    if (changes.card) {
      this.setCard();
    }
  }

  subscribeToSettings() {
    this.twentyone.settings$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(settings => {
        this.settings = settings;
        if (this.neat || this.neat === '' || settings.alignment === 'neat') {
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
      style({ 'will-change': 'transform, opacity', opacity: 0, transform: 'translateY(-308px) rotate(' + this.rand1 + 'deg)' }),
      animate('180ms ease-in', style({ opacity: 1, transform: 'translateY(0) rotate(0deg)' })),
    ];
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
