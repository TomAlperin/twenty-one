
export class TwentyoneSettings {
  public toolTips = true;
  public alignment: 'natural' | 'neat' = 'natural';
  public cardSize = false;
  public sounds: 'blackjack' | 'stanky' | 'off' = 'blackjack';
  public deckCount = 2;

  constructor(game: any = {}) {
    Object.keys(this).forEach(key => {
      if (game[key] !== undefined) {
        this[key] = game[key];
      }
    });
  }
}
