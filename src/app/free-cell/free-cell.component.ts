import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FreeCellGame } from '@models/free-cell-game';
import { FreeCellStats } from '@models/free-cell-stats';
import { FreeCellService } from '@services/free-cell.service';
import { WindowService } from '@services/window.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';
import { CardService } from '@services/card.service';
import { FreeCellStatsComponent } from './free-cell-stats/free-cell-stats.component';
import { AnimatedCard } from '@models/animated-card';

@Component({
  selector: 'app-free-cell',
  templateUrl: './free-cell.component.html',
  styleUrls: ['./free-cell.component.scss']
})
export class FreeCellComponent implements OnInit, OnDestroy {
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
  foundation: (AnimatedCard | number)[][] = [
    [],
    [],
    [],
    []
  ];
  landscape = false;
  animate = false;
  cardSound = false;
  won = false;
  dealing = false;
  destroyed$ = new Subject();

  constructor(
    private freeCell: FreeCellService,
    private cardService: CardService,
    private window: WindowService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.subscribeToGame();
    this.subscribeToStats();
    this.subscribeToSave();
  }

  async subscribeToGame() {
    this.freeCell.game$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(async (game: FreeCellGame) => {
        game.foundation = game.foundation.map(column => column.map(card => (card as unknown as AnimatedCard).card || card));
        Object.assign(this, _.omit(game, ['stock']));

        if (game.stock) {
          this.dealing = true;
          const deck = game.stock;
          delete game.stock;
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

          this.animate = false;
          this.save();
          this.dealing = false;
        } else {
          this.animate = false;
          this.cardSound = false;
          setTimeout(() => this.cardSound = true, 0);
        }

        await new Promise((resolve) => setTimeout(resolve, 100));
        this.cardSound = true;
      });

  }

  subscribeToStats() {
    this.freeCell.gameStats$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((stats: FreeCellStats) => this.hasStats = !_.isEmpty(stats));
  }

  subscribeToSave() {
    this.freeCell
      .triggerSave$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.save();
      });
  }

  doEvent(action: string) {
    switch (action) {
      case 'restart':
        const totalCards = this.foundation.reduce((prev: number, curr: number[]) => {
          return prev + curr.length;
        }, 0);

        if (!this.freeCell.game.new && totalCards < 52) {
          this.freeCell.gameResult = 'lose';
        }

        const game = new FreeCellGame();

        game.stock = this.cardService.shuffleCards();
        delete game.new;
        this.freeCell.game = game;
        break;
      case 'stats':
        this.window.loadComponent(FreeCellStatsComponent);
        break;
      default:
        break;
    }
  }

  save() {
    this.freeCell.saveGame({
      freeCells: this.freeCells,
      tableau: this.tableau,
      foundation: this.foundation.map(
        stack => stack.map(
          card => _.get(card, 'card', card)
        )
      ),
      won: this.won
    });
  }

  trackByFn = (index: number) => index;

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
