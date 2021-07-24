
export class Settings {
  // general
  public toolTips = true;
  public alignment: 'natural' | 'neat' = 'natural';
  public cardSize = false;
  public sounds: 'blackjack' | 'stanky' | 'off' = 'blackjack';
  public sidebar = false;
  // twenty one
  public deckCount = 2;
  // solitaire
  public drawCount = 1;

  constructor(settings: any = {}) {
    Object.assign(this, settings);
  }
}
