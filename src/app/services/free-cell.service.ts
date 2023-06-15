import { Injectable } from '@angular/core';
import { FreeCellGame } from '@models/free-cell-game';
import { FreeCellStats } from '@models/free-cell-stats';
import { WinComponent } from '@shared/win/win.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { CardService } from './card.service';
import { SoundService } from './sound.service';
import { WindowService } from './window.service';
// tslint:disable-next-line:no-string-literal
const hasLocalStorage = 'localStorage' in window && window['localStorage'] !== null;

@Injectable({ providedIn: 'root' })
export class FreeCellService {
  public game$ = new BehaviorSubject<FreeCellGame>(new FreeCellGame());
  public gameStats$ = new BehaviorSubject<FreeCellStats>(new FreeCellStats());
  public triggerSave$ = new Subject();

  constructor(
    private soundService: SoundService,
    private cardService: CardService,
    private window: WindowService
  ) {
    const gameState = localStorage['free-cell-gamestate'];
    if (gameState) {
      this.game$.next(JSON.parse(atob(gameState)));
    } else {
      const game = this.game;

      game.stock = this.cardService.shuffleCards();
      delete game.new;
      this.saveGame(game);
    }

    // saved game stats
    const stats = localStorage['free-cell-stats'];
    if (stats) {
      this.gameStats$.next(JSON.parse(atob(stats)));
    }
  }

  public get game(): FreeCellGame {
    return this.game$.getValue();
  }

  public set game(game) {
    game = Object.assign({}, game);

    if (hasLocalStorage) {
      localStorage['free-cell-gamestate'] = btoa(JSON.stringify(game));
    }

    this.game$.next(game);
  }

  set gameResult(result: 'win' | 'lose' | 'reset') {
    let stats: FreeCellStats = this.gameStats$.getValue();

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
    } else {
      stats = new FreeCellStats();
    }
    this.gameStats$.next(stats);

    if (hasLocalStorage) {
      localStorage['free-cell-stats'] = btoa(JSON.stringify(stats));
    }
  }

  set stats(stats: FreeCellStats) {
    this.gameStats$.next(stats);

    if (hasLocalStorage) {
      localStorage['free-cell-stats'] = btoa(JSON.stringify(stats));
    }
  }

  saveGame(game: FreeCellGame) {
    if (hasLocalStorage) {
      localStorage['free-cell-gamestate'] = btoa(JSON.stringify(game));
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
      }
    }, 200);
  }
}
