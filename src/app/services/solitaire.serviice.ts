
import { Injectable } from '@angular/core';
import { SolitaireGame } from '@models/solitaire-game';
import { ShuffleCardsComponent } from '@shared/shuffle-cards/shuffle-cards.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { WinComponent } from '@shared/win/win.component';
import { WindowService } from './window.service';
import { SoundService } from './sound.service';
import { DrawStats, SolitaireStats } from '@models/solitaire-stats';
import { TwentyOneService } from './twenty-one.service';
// tslint:disable-next-line:no-string-literal
const hasLocalStorage = 'localStorage' in window && window['localStorage'] !== null;

@Injectable({ providedIn: 'root' })
export class SolitaireService {
  public game$ = new BehaviorSubject<SolitaireGame>(new SolitaireGame());
  public gameStats$ = new BehaviorSubject<SolitaireStats>(new SolitaireStats());
  public triggerSave$ = new Subject();

  constructor(
    private window: WindowService,
    private soundService: SoundService,
    private twentyone: TwentyOneService
  ) {
    const gameState = localStorage['solitaire-gamestate'];
    if (gameState) {
      this.game$.next(JSON.parse(atob(gameState)));
    } else {
      const game = this.game;

      game.stock = this.shuffleCards();
      delete game.new;
      this.saveGame(game);
    }

    // saved game stats
    const stats = localStorage['solitaire-stats'];
    if (stats) {
      this.gameStats$.next(JSON.parse(atob(stats)));
    }
  }

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

  public get game(): SolitaireGame {
    return this.game$.getValue();
  }

  public set game(game) {
    game = Object.assign({}, game);

    if (hasLocalStorage) {
      localStorage['solitaire-gamestate'] = btoa(JSON.stringify(game));
    }

    this.game$.next(game);
  }

  set gameResult(result: 'win' | 'lose' | 'reset') {
    const { drawCount } = this.twentyone.settings$.getValue();
    let allStats: SolitaireStats = this.gameStats$.getValue();
    const stats: DrawStats = allStats[`Draw ${drawCount}`] || new DrawStats();

    if (result !== 'reset') {
      switch (result) {
        case 'win':
          stats.gamesPlayed++;
          stats.wins++;
          stats.totalWins++;
          stats.losses = 0;
          break;
        case 'lose':
          stats.gamesPlayed++;
          stats.wins = 0;
          stats.losses++;
          stats.totalLosses++;
          break;
        default:
          break;
      }

      if (stats.wins > stats.maxWins) { stats.maxWins = stats.wins; }
      if (stats.losses > stats.maxLose) { stats.maxLose = stats.losses; }

      const deck = `Draw ${drawCount}`;
      allStats = Object.assign(allStats, { [deck]: stats });
    } else {
      allStats = new SolitaireStats();
    }
    this.gameStats$.next(allStats);

    if (hasLocalStorage) {
      localStorage['solitaire-stats'] = btoa(JSON.stringify(allStats));
    }
  }

  set allStats(allStats: SolitaireStats) {
    this.gameStats$.next(allStats);

    if (hasLocalStorage) {
      localStorage['solitaire-stats'] = btoa(JSON.stringify(allStats));
    }
  }

  saveGame(game: SolitaireGame) {
    if (hasLocalStorage) {
      localStorage['solitaire-gamestate'] = btoa(JSON.stringify(game));
    }
  }

  checkWin(foundation: number[][]) {
    const totalCards = foundation.reduce((prev: number, curr: number[]) => {
      return prev + curr.length;
    }, 0);

    if (totalCards === 52) {
      this.soundService.playSound('win');
      this.window.loadComponent(WinComponent, { winImage: 'geebee-solitaire.png' });
      this.game = Object.assign({}, this.game, { won: true });
      this.gameResult = 'win';
    }
    this.triggerSave$.next();
    return totalCards;
  }
}
