
export class TwentyoneSettings {
  public toolTips = true;
  public alignment: 'natural' | 'neat' = 'natural';
  public cardSize = false;
  public sounds: 'blackjack' | 'stanky' | 'off' = 'blackjack';
  public deckCount = 2;
  public sidebar = false;

  constructor(settings: any = {}) {
    Object.assign(this, settings);
  }
}
