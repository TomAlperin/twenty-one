
import { Injectable } from '@angular/core';
import { ShuffleCardsComponent } from '@shared/shuffle-cards/shuffle-cards.component';
import { BlackjackComponent } from '../twenty-one/blackjack/blackjack.component';
import { WindowService } from './window.service';

@Injectable({ providedIn: 'root' })
export class SolitaireService {

  constructor(
    private window: WindowService
  ) { }

  shuffleCards(decks: number = 1) {
    setTimeout(() => this.window.loadComponent(ShuffleCardsComponent), 0);
    const cards = [];

    for (let y = 0; y < decks; y++) {         // For "y" decks
      for (let i = 4; i <= 55; i++) {    // Load 52 cards in deck
        cards.push(i);
      }
    }
    for (let j, x, z = cards.length; z; j = Math.floor(Math.random() * z),  // Shuffle cards in deck
      x = cards[--z], cards[z] = cards[j], cards[j] = x) { }

    return cards;
  }

  checkWin(foundation: number[][]) {
    const totalCards = foundation.reduce((prev: number, curr: number[]) => {
      return prev + curr.length;
    }, 0);

    if (totalCards === 52) {
      this.window.loadComponent(BlackjackComponent);
    }

    return totalCards;
  }
}
