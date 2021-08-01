import { AfterViewInit, ApplicationRef, Component, ComponentRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shuffle-cards',
  templateUrl: './shuffle-cards.component.html',
  styleUrls: ['./shuffle-cards.component.scss']
})
export class ShuffleCardsComponent implements OnInit, AfterViewInit {
  cards: number[] = [];
  hand: number[] = [];
  show = false;
  cardX: string;
  cardY: string;
  cardStyles: any = {};
  interval: NodeJS.Timer;
  @Input() cardHeight = 210;
  @Input() position = 'uppser left';
  @Input() timeout = 1500;
  @Input() componentRef: ComponentRef<ShuffleCardsComponent>;

  constructor(private appRef: ApplicationRef) {
    this.shuffle();

    this.interval = setInterval(() => {
      this.hand.push(this.cards.pop());
      if (this.hand.length > 5) {
        this.hand.shift();
      }
      if (this.cards.length === 0) {
        this.shuffle();
      }
    }, 200);
  }

  ngOnInit(): void {
    this.cardX = this.position.includes('right') ? 'right' : 'left';
    this.cardY = this.position.includes('bottom') ? 'bottom' : 'top';

    this.cardStyles = {
      width: `${this.cardHeight + 100}px`,
      height: `${this.cardHeight + 100}px`,
      [this.cardX]: '20px',
      [this.cardY]: this.position.includes('bottom') ? '20px' : '55px'
    };
    console.log(this.cardStyles);
    setTimeout(() => {
      this.show = false;
      setTimeout(() => {
        clearTimeout(this.interval);
        this.appRef.detachView(this.componentRef.hostView);
        this.componentRef.destroy();
      }, 400);
    }, this.timeout);
  }

  ngAfterViewInit() {
    setTimeout(() => this.show = true, 10);
  }

  shuffle() {
    this.cards = [];

    for (let i = 4; i <= 55; i++) { // Load 52 cards in deck
      this.cards.push(i);
    }

    for (let j, x, z = this.cards.length; z; j = Math.floor(Math.random() * z),  // Shuffle cards in deck
      x = this.cards[--z], this.cards[z] = this.cards[j], this.cards[j] = x) { }
  }
}
