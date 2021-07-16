import { TwentyoneGame } from './twentyone-game';

export class CountStats {
  highScore = 1000;
  gamesPlayed = 0;
  bestHandCount = 0;
  curHandCount = 0;
  wins = 0;
  totalWins = 0;
  totalWon = 0;
  maxWins = 0;
  losses = 0;
  totalLosses = 0;
  totalLost = 0;
  maxLose = 0;
  game: TwentyoneGame;
}

export class TwentyoneStats {
  [deck: string]: CountStats;

  constructor(stats: any = {}) {
    Object.assign(this, stats);
  }
}
