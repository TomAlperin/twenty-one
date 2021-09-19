import { Component, OnInit } from '@angular/core';
import { SolitaireService } from '@services/solitaire.serviice';
import { SoundService } from '@services/sound.service';

@Component({
  selector: 'app-free-cell',
  templateUrl: './free-cell.component.html',
  styleUrls: ['./free-cell.component.scss']
})
export class FreeCellComponent implements OnInit {
  hasStats = false;
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
  landscape = false;
  animate = false;
  cardSound = false;

  constructor(
    private solitaireService: SolitaireService,
    private soundService: SoundService
  ) { }

  ngOnInit(): void {
    this.subscribeToGame();
  }

  async subscribeToGame() {
    const deck = this.solitaireService.shuffleCards();
    if (deck.length === 52) {
      this.animate = true;

      this.cardSound = true;
      for (let row = 0; row < 7; row++) {
        for (let column = 0; column < 8; column++) {
          const card = deck.pop();
          if (card) {
            this.tableau[column].push({ card, flip: false });
            this.tableau[column] = [...this.tableau[column]];
            await new Promise((resolve) => setTimeout(resolve, 200));
          } else {
            break;
          }
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 150));
      this.soundService.playSound('card-sound');

      this.animate = false;
    } else {
      this.animate = false;
      this.cardSound = false;
      setTimeout(() => this.cardSound = true, 0);
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
    this.cardSound = true;
  }

  doEvent(event: string) {

  }

  trackByFn = (index: number) => index;
}
