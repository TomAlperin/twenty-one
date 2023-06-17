
import { Injectable } from '@angular/core';
import { SolitaireGame } from '@models/solitaire-game';
import { BehaviorSubject, Subject } from 'rxjs';
import { WinComponent } from '@shared/win/win.component';
import { WindowService } from './window.service';
import { SoundService } from './sound.service';
import { DrawStats, SolitaireStats } from '@models/solitaire-stats';
import { TwentyOneService } from './twenty-one.service';
import { CardService } from './card.service';
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
    private twentyone: TwentyOneService,
    private cardService: CardService
  ) {
    const gameState = localStorage['solitaire-gamestate'];
    if (gameState) {
      this.game$.next(JSON.parse(atob(gameState)));
    } else {
      const game = this.game;

      game.stock = this.cardService.shuffleCards();
      delete game.new;
      this.saveGame(game);
    }

    // saved game stats
    const stats = localStorage['solitaire-stats'];
    if (stats) {
      this.gameStats$.next(JSON.parse(atob(stats)));
    }
  }

  public get game(): SolitaireGame {
    return this.game$.getValue();
  }

  public set game(game) {
    game = Object.assign({}, game);

    this.saveGame(game);
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

  checkWin() {
    setTimeout(() => {
      const totalCards = this.game$.getValue().foundation.reduce((prev: number, curr: number[]) => {
        return prev + curr.length;
      }, 0);

      if (!this.game.won && totalCards === 52) {
        this.soundService.playSound('win');
        this.window.loadComponent(WinComponent, { winImage: 'geebee-solitaire.png' });
        this.game = Object.assign({}, this.game, { won: true });
        this.gameResult = 'win';
        this.triggerSave$.next();
      } else {
        this.saveGame(this.game);
      }
    }, 200);
  }
}
