export class SolitaireGame {
  stock: number[] = [];
  talon: number[] = [];
  tableau: { card: number, flip: boolean }[][] = [
    [],
    [],
    [],
    [],
    [],
    [],
    []
  ];
  foundation: number[][] = [
    [],
    [],
    [],
    []
  ];
  won = false;
  public new?: boolean;

  constructor(game: any = {}) {
    this.new = true;
    Object.assign(this, game);
  }
}
