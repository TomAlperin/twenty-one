
import { Injectable } from '@angular/core';
import { get as _get } from 'lodash';
import { BehaviorSubject, Subject } from 'rxjs';
import { Game } from '../models/game';
import { Settings } from '../models/settings';
import { ShuffleCardsComponent } from '../shared/shuffle-cards/shuffle-cards.component';
// tslint:disable-next-line:no-string-literal
const hasLocalStorage = 'localStorage' in window && window['localStorage'] !== null;

@Injectable({ providedIn: 'root' })
export class TwentyOneService {
  private game = new BehaviorSubject<Game>(new Game());
  public game$ = this.game.asObservable();

  private settings = new BehaviorSubject<Settings>(new Settings());
  public settings$ = this.settings.asObservable();


  private component = new Subject();
  public component$ = this.component.asObservable();

  constructor() {
    const gameState = localStorage.gameState;
    if (gameState) {
      this.game.next(JSON.parse(atob(gameState)));
    } else {
      // this.shuffleCards(this.game);
      this.saveGame(this.game.getValue());
    }

    // custom game settings
    const settings = localStorage.settings;
    if (settings) {
      this.settings.next(JSON.parse(atob(settings)));
    }
  }

  public get gameSettings(): Settings {
    return this.settings.getValue();
  }

  public get gameState(): Game {
    return this.game.getValue();
  }

  saveGame(game: Game) {
    game = Object.assign({}, game);

    if (hasLocalStorage) {
      localStorage.gameState = btoa(JSON.stringify(game));
    }

    this.game.next(game);
  }

  saveSettings(settings: Settings) {
    settings = Object.assign({}, settings);

    if (hasLocalStorage) {
      localStorage.settings = btoa(JSON.stringify(settings));
    }

    this.settings.next(settings);
  }


  shuffleCards(game: Game) {
    setTimeout(() => this.loadComponent(ShuffleCardsComponent), 0);
    const cards = [];
    const decks = this.settings.getValue().deckCount;

    for (let y = 0; y < decks; y++) {         // For "y" decks
      for (let i = 4; i <= 55; i++) {    // Load 52 cards in deck
        cards.push(i);
      }
    }
    for (let j, x, z = cards.length; z; j = Math.floor(Math.random() * z),  // Shuffle cards in deck
      x = cards[--z], cards[z] = cards[j], cards[j] = x) { }

    game.deck = cards;
    this.saveGame(game);
  }

  loadComponent(component: any) {
    this.component.next(component);
  }
}
