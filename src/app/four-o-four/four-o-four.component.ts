import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-four-o-four',
  templateUrl: './four-o-four.component.html',
  styleUrls: ['./four-o-four.component.scss']
})
export class FourOFourComponent implements OnDestroy {
  cards: number[] = [];
  hand = [];
  interval: NodeJS.Timer;

  constructor() {
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

  shuffle() {
    this.cards = [];

    for (let i = 4; i <= 55; i++) { // Load 52 cards in deck
      this.cards.push(i);
    }

    for (let j, x, z = this.cards.length; z; j = Math.floor(Math.random() * z),  // Shuffle cards in deck
      x = this.cards[--z], this.cards[z] = this.cards[j], this.cards[j] = x) { }
  }

  ngOnDestroy() {
    clearTimeout(this.interval);
  }
}
