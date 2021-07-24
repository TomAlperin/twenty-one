import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SolitaireService } from '@services/solitaire.serviice';
import { SoundService } from '@services/sound.service';
import { WindowService } from '@services/window.service';

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
  destroyed$ = new Subject();

  constructor(
    private solitaire: SolitaireService,
    private window: WindowService,
    private soundService: SoundService,
  ) {
    this.subscribeToOrientationResize();
  }

  async ngOnInit() {
    this.setWidth();

    this.stock = this.solitaire.shuffleCards();
    for (let row = 0; row < 7; row++) {
      for (let column = 0; column < 7; column++) {
        if (column >= row) {
          this.tableau[column].push({ card: this.stock.pop(), flip: column > row });
          this.tableau[column] = [...this.tableau[column]];
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
      }
    }
    this.animate = false;
  }

  subscribeToOrientationResize() {
    this.window.orientationresize$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(event => this.setWidth());
  }

  setWidth() {
    const width = window.innerWidth;
    this.width = Math.min((width / 14) + 20, 140);
  }

  async draw() {
    if (this.stock.length) {
      this.talon.push(this.stock.pop());
    } else {
      this.stock = this.talon.reverse();
      this.talon = [];
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
    this.soundService.playSound('card-sound');
  }

  trackByFn = (index: number) => index;

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
