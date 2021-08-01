import { SolitaireGame } from './solitaire-game';

export class DrawStats {
  gamesPlayed = 0;
  wins = 0;
  totalWins = 0;
  maxWins = 0;
  losses = 0;
  totalLosses = 0;
  maxLose = 0;
  game: SolitaireGame;
}

export class SolitaireStats {
  [drawCount: string]: DrawStats;

  constructor(stats: any = {}) {
    Object.assign(this, stats);
  }
}
