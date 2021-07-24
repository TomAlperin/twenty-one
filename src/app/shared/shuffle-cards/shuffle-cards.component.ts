import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-shuffle-cards',
  templateUrl: './shuffle-cards.component.html',
  styleUrls: ['./shuffle-cards.component.scss']
})
export class ShuffleCardsComponent implements OnInit, AfterViewInit {
  cards: number[] = [];
  hand: number[] = [];
  show = false;
  interval: NodeJS.Timer;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
  ) {
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
    setTimeout(() => {
      this.show = false;
      setTimeout(() => {
        clearTimeout(this.interval);
        this.renderer.removeChild(document.body, this.el.nativeElement);
      }, 400);
    }, 1500);
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