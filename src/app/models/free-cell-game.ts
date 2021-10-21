export class FreeCellGame {
  stock?: number[];
  freeCells: number[] = [
    0,
    0,
    0,
    0
  ];
  tableau: { card: number, flip: boolean }[][] = [
    [],
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
