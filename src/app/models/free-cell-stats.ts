export class FreeCellStats {
  gamesPlayed = 0;
  wins = 0;
  totalWins = 0;
  maxWins = 0;
  losses = 0;
  totalLosses = 0;
  maxLose = 0;

  constructor(stats: any = {}) {
    Object.assign(this, stats);
  }
}
