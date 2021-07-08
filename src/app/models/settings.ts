
export class Settings {
  public alignment: 'natural' | 'neat' = 'natural';
  public cardSize = false;
  public sounds: 'classic' | 'stanky' | 'off' = 'classic';
  public deckCount = 2;

  constructor(game: any = {}) {
    Object.keys(this).forEach(key => {
      if (game[key] !== undefined) {
        this[key] = game[key];
      }
    });
  }
}
