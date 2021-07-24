
import { Injectable } from '@angular/core';
import { SolitaireGame } from '@models/solitaire-game';
import { ShuffleCardsComponent } from '@shared/shuffle-cards/shuffle-cards.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { WinComponent } from '@shared/win/win.component';
import { WindowService } from './window.service';
import { SoundService } from './sound.service';
// tslint:disable-next-line:no-string-literal
const hasLocalStorage = 'localStorage' in window && window['localStorage'] !== null;

@Injectable({ providedIn: 'root' })
export class SolitaireService {
  private game = new BehaviorSubject<SolitaireGame>(new SolitaireGame());
  public game$ = this.game.asObservable();
  public triggerSave$ = new Subject();

  constructor(
    private window: WindowService,
    private soundService: SoundService,
  ) {
    const gameState = localStorage['solitaire-gamestate'];
    if (gameState) {
      this.game.next(JSON.parse(atob(gameState)));
    } else {
      const game = this.gameState;

      game.stock = this.shuffleCards();
      this.saveGame(game);
    }
  }

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

  public get gameState(): SolitaireGame {
    return this.game.getValue();
  }

  public set gameState(game) {
    this.saveGame(game);
  }

  saveGame(game: SolitaireGame) {
    game = Object.assign({}, game);

    if (hasLocalStorage) {
      localStorage['solitaire-gamestate'] = btoa(JSON.stringify(game));
    }

    this.game.next(game);
  }

  checkWin(foundation: number[][]) {
    const totalCards = foundation.reduce((prev: number, curr: number[]) => {
      return prev + curr.length;
    }, 0);

    if (totalCards === 52) {
      this.soundService.playSound('win');
      this.window.loadComponent(WinComponent, { winImage: 'geebee-solitaire.png' });
      this.gameState = Object.assign({}, this.gameState, { won: true });
    }
    this.triggerSave$.next();
    return totalCards;
  }
}
