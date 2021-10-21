import { Injectable } from '@angular/core';
import { ShuffleCardsComponent } from '@shared/shuffle-cards/shuffle-cards.component';
import { WindowService } from './window.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private window: WindowService) { }

  shuffleCards(decks: number = 1) {
    this.window.loadComponent(ShuffleCardsComponent, { cardHeight: 100, timeout: 5500, position: 'bottom left' });
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
}
