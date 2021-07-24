import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SolitaireService } from '@services/solitaire.serviice';
import { SoundService } from '@services/sound.service';
import { WindowService } from '@services/window.service';
import { SolitaireGame } from '@models/solitaire-game';
import { TwentyOneService } from '@services/twenty-one.service';

@Component({
  selector: 'app-solitaire',
  templateUrl: './solitaire.component.html',
  styleUrls: ['./solitaire.component.scss']
})
export class SolitaireComponent implements OnInit, OnDestroy {
  stock: number[] = [];
  talon: number[] = [];
  width = 120;
  animate = true;
  cardSound = false;
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
  stockDisabled = false;
  won = false;
  destroyed$ = new Subject();

  constructor(
    private solitaire: SolitaireService,
    private window: WindowService,
    private soundService: SoundService,
    private twentyone: TwentyOneService,
  ) {
    this.subscribeToOrientationResize();
  }

  async ngOnInit() {
    this.setWidth();
    this.subscribeToGame();
    this.subscribeToSave();
  }

  subscribeToGame() {
    this.solitaire.game$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(async (game: SolitaireGame) => {
        Object.assign(this, game);
        if (this.stock.length === 52) {
          const cards = this.stock.splice(-28, 28);
          this.save();
          this.animate = true;
          await new Promise((resolve) => setTimeout(resolve, 2000));

          this.cardSound = true;
          for (let row = 0; row < 7; row++) {
            for (let column = 0; column < 7; column++) {
              if (column >= row) {
                this.tableau[column].push({ card: cards.pop(), flip: true });
                this.tableau[column] = [...this.tableau[column]];
                await new Promise((resolve) => setTimeout(resolve, 200));
              }
            }
          }

          for (const row of this.tableau) {
            row[row.length - 1].flip = false;
          }

          await new Promise((resolve) => setTimeout(resolve, 150));
          this.soundService.playSound('card-sound');

          this.animate = false;
          this.save();
        } else {
          this.animate = false;
        }

        await new Promise((resolve) => setTimeout(resolve, 100));
        this.cardSound = true;
      });
  }

  subscribeToOrientationResize() {
    this.window.orientationresize$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(event => this.setWidth());
  }

  subscribeToSave() {
    this.solitaire
      .triggerSave$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.save();
      });
  }

  doEvent(action: string) {
    switch (action) {
      case 'restart':
        const game = new SolitaireGame();

        game.stock = this.solitaire.shuffleCards();
        this.solitaire.gameState = game;
        break;
      default:
        break;
    }
  }

  save() {
    this.solitaire.gameState = {
      stock: this.stock,
      tableau: this.tableau,
      talon: this.talon,
      foundation: this.foundation,
      won: this.won
    };
  }

  setWidth() {
    const width = window.innerWidth;
    this.width = Math.min((width / 14) + 20, 140);
  }

  async draw() {
    if (!this.stockDisabled) {
      this.stockDisabled = true;

      for (let i = 0; i < (this.twentyone.gameSettings.drawCount || 1); i++) {
        if (this.stock.length) {
          this.talon.push(this.stock.pop());
        } else if (i === 0) {
          this.stock = this.talon.reverse();
          this.talon = [];
        } else {
          break;
        }
      }

      this.save();

      await new Promise((resolve) => setTimeout(resolve, 100));
      this.soundService.playSound('card-sound');
      await new Promise((resolve) => setTimeout(resolve, 400));
      this.stockDisabled = false;
    }
  }

  trackByFn = (index: number) => index;

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
