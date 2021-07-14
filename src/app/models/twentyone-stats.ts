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
}

export class TwentyoneStats {
  [deck: string]: CountStats;

  constructor(game: any = {}) {
    Object.keys(this).forEach(key => {
      if (game[key] !== undefined) {
        this[key] = game[key];
      }
    });
  }
}
