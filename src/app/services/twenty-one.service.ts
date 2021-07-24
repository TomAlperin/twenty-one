
import { Injectable } from '@angular/core';
import { get as _get } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { Result, TwentyoneGame } from '@models/twentyone-game';
import { Settings } from '@models/settings';
import { TwentyoneStats, CountStats } from '@models/twentyone-stats';
import { ShuffleCardsComponent } from '@shared/shuffle-cards/shuffle-cards.component';
import { WindowService } from './window.service';
// tslint:disable-next-line:no-string-literal
const hasLocalStorage = 'localStorage' in window && window['localStorage'] !== null;

@Injectable({ providedIn: 'root' })
export class TwentyOneService {
  private game = new BehaviorSubject<TwentyoneGame>(new TwentyoneGame());
  public game$ = this.game.asObservable();

  private settings = new BehaviorSubject<Settings>(new Settings());
  public settings$ = this.settings.asObservable();

  public gameStats = new BehaviorSubject<TwentyoneStats>(new TwentyoneStats());
  public gameStats$ = this.gameStats.asObservable();

  private animation = new BehaviorSubject<boolean>(false);
  public animation$ = this.animation.asObservable();

  constructor(private window: WindowService) {
    const gameState = localStorage['twentyone-gamestate'];
    if (gameState) {
      this.game.next(JSON.parse(atob(gameState)));
    } else {
      this.shuffleCards();
      this.saveGame(this.game.getValue());
    }

    // custom game settings
    const settings = localStorage['twentyone-settings'];
    if (settings) {
      this.settings.next(JSON.parse(atob(settings)));
    }

    // custom game settings
    const stats = localStorage['twentyone-stats'];
    if (stats) {
      this.gameStats.next(JSON.parse(atob(stats)));
    }
  }

  public get gameSettings(): Settings {
    return this.settings.getValue();
  }

  public get gameState(): TwentyoneGame {
    return this.game.getValue();
  }

  public set gameState(game) {
    this.saveGame(game);
  }

  public set animate(value: boolean) {
    this.animation.next(value);
  }

  public get animate() {
    return this.animation.getValue();
  }

  saveGame(game: TwentyoneGame) {
    game = Object.assign({}, game);

    if (hasLocalStorage) {
      localStorage['twentyone-gamestate'] = btoa(JSON.stringify(game));
    }

    this.game.next(game);
  }

  saveSettings(settings: Settings) {
    settings = Object.assign({}, settings);

    if (hasLocalStorage) {
      localStorage['twentyone-settings'] = btoa(JSON.stringify(settings));
    }

    this.settings.next(settings);
  }

  set allStats(allStats: TwentyoneStats) {
    this.gameStats.next(allStats);

    if (hasLocalStorage) {
      localStorage['twentyone-stats'] = btoa(JSON.stringify(allStats));
    }
  }

  set stats({ game, result, odds }: { game?: TwentyoneGame, result: Result, odds?: number }) {
    const { deckCount } = this.settings.getValue();
    let allStats: TwentyoneStats = this.gameStats.getValue();
    const stats: CountStats = allStats[`${deckCount} Deck${deckCount !== 1 ? 's' : ''}`] || new CountStats();

    if (result !== 'reset') {
      if (game.bank > stats.highScore) {
        stats.highScore = game.bank;
      }
      if (stats.totalLost < 0) {
        stats.totalLost = stats.totalLost * -1;
      }

      switch (result) {
        case 'tie':
          stats.curHandCount++;
          stats.wins = 0;
          stats.losses = 0;
          break;
        case 'blackjack':
        case 'win':
          stats.curHandCount++;
          stats.wins++;
          stats.totalWins++;
          stats.totalWon = stats.totalWon + game.bet * odds;
          stats.losses = 0;
          break;
        case 'lose':
          stats.curHandCount++;
          stats.wins = 0;
          stats.losses++;
          stats.totalLosses++;
          stats.totalLost = stats.totalLost + game.bet * odds;
          break;
        case 'bank-reset':
          stats.curHandCount = 0;
          stats.gamesPlayed++;
          break;
        default:
          break;
      }

      if (stats.curHandCount > stats.bestHandCount) { stats.bestHandCount = stats.curHandCount; }
      if (stats.wins > stats.maxWins) { stats.maxWins = stats.wins; }
      if (stats.losses > stats.maxLose) { stats.maxLose = stats.losses; }

      const deck = `${deckCount} Deck${deckCount !== 1 ? 's' : ''}`;
      allStats = Object.assign(allStats, { [deck]: stats });
    } else {
      allStats = new TwentyoneStats();
    }
    this.gameStats.next(allStats);

    if (hasLocalStorage) {
      localStorage['twentyone-stats'] = btoa(JSON.stringify(allStats));
    }
  }

  shuffleCards() {
    const game = this.game.getValue();
    setTimeout(() => this.window.loadComponent(ShuffleCardsComponent), 0);
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

  checkTotal(hand) {                              // Check the value of a hand
    let total = 0;
    for (const card of hand) {
      if (Math.floor(card / 4) > 10) {            // Cards over 10 worth 10
        total += 10;
      }
      else if (Math.floor(card / 4) === 1) {      // Aces are worth 11
        total += 11;
      } else {
        total += Math.floor(card / 4);
      }
    }

    let i = 0;
    while (total > 21 && i < hand.length) {       // Subtract 10 for every ace
      if (Math.floor(hand[i] / 4) === 1) {        // just until under 22
        total -= 10;
      }
      i++;
    }
    return total;
  }
}
