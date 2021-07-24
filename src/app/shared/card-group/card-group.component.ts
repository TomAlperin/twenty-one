import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WindowService } from '@services/window.service';
import * as _ from 'lodash';
import { SolitaireService } from '@services/solitaire.serviice';

@Component({
  selector: 'app-card-group',
  templateUrl: './card-group.component.html',
  styleUrls: ['./card-group.component.scss']
})
export class CardGroupComponent implements OnInit, OnDestroy {
  dragging = false;
  dragged = false;
  lastX = 0;
  lastY = 0;
  posX = 0;
  posY = 0;
  timeout: NodeJS.Timer;
  testCol: number;
  @Input() tableau: { card: number, flip: boolean }[][] = [];
  @Input() foundation: number[][] = [];
  @Input() cards: { card: number, flip: boolean }[] = [];
  @Input() column: number;
  @Input() animate: boolean;
  @Input() width: number;
  @Input() offset: number;

  destroyed$ = new Subject();

  constructor(
    private window: WindowService,
    private solitaire: SolitaireService,
  ) {
    this.window.mousetouchmove$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((event: MouseEvent & TouchEvent) => this.doDrag(event));

    this.window.mousetouchend$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((event: MouseEvent & TouchEvent) => this.endDrag(event));

    this.subscribeToOrientationResize();
  }

  ngOnInit(): void {
    this.setOffset();
  }

  subscribeToOrientationResize() {
    this.window.orientationresize$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(event => this.setOffset());
  }

  setOffset() {
    const height = window.innerHeight;
    this.offset = Math.min((height / 28), 50);
  }

  start(event) {
    event.preventDefault();
    this.dragging = true;
  }

  doDrag(event: MouseEvent & TouchEvent) {
    event.preventDefault();
    const clientX = event.clientX || _.get(event, 'touches[0].clientX');
    const clientY = event.clientY || _.get(event, 'touches[0].clientY');

    if (this.dragging) {
      this.dragged = true;
      clearTimeout(this.timeout);

      if (this.lastX && !this.cards[0].flip) {
        this.posX += clientX - this.lastX;
        this.posY += clientY - this.lastY;
      }
      this.lastX = clientX;
      this.lastY = clientY;
    }
  }

  endDrag(event: MouseEvent & TouchEvent) {
    let element = event.target;
    const changedTouch = _.get(event, 'changedTouches[0]');

    if (changedTouch) {
      element = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
    }

    this.posX = 0;
    this.posY = 0;
    this.lastX = 0;
    this.lastY = 0;

    if (this.dragging) {
      if (!this.dragged) {
        this.toFoundation();
      } else {
        let column: string | number = (element as HTMLElement).getAttribute('data-column');

        if (column !== null) {
          column = +column;
          const dragCard = this.cards[0].card;
          const dragValue = Math.floor(dragCard / 4);
          const dragSuit = dragCard % 4;

          if (column > 6) {
            if (this.cards.length === 1) {
              if (this.foundation[column - 7].length + 1 === dragValue) {
                const foundationCard = this.foundation[column - 7][this.foundation[column - 7].length - 1];

                if (!foundationCard || dragSuit === foundationCard % 4) {
                  const cards = this.tableau[this.column].splice(-this.cards.length);
                  this.tableau[this.column] = [...this.tableau[this.column]];
                  this.foundation[column - 7].push(cards[0].card);
                  this.flipCard();
                }
              }
            }
          } else {
            const dropCard = this.tableau[column][this.tableau[column].length - 1];

            let dropValue = 0;
            let dropSuit = 0;

            if (dropCard) {
              dropValue = Math.floor(dropCard.card / 4);
              dropSuit = dropCard.card % 4;
            }

            if (
              (dragValue === dropValue - 1 && dragSuit % 2 !== dropSuit % 2) ||
              (dropValue === 0 && dragValue === 13)
            ) {
              const cards = this.tableau[this.column].splice(-this.cards.length);
              this.tableau[this.column] = [...this.tableau[this.column]];

              this.tableau[column].push(...cards);
              this.tableau[column] = [...this.tableau[column]];
              this.flipCard();
            }
          }
        }
      }
    }
    this.dragging = false;
    this.dragged = false;
    this.solitaire.checkWin(this.foundation);
  }

  toFoundation() {
    const dragCard = this.cards[this.cards.length - 1].card;
    const dragValue = Math.floor(dragCard / 4);
    const dragSuit = dragCard % 4;
    let i = 0;

    for (const stack of this.foundation) {
      if (this.cards.length === 1) {
        if (stack.length + 1 === dragValue) {
          const foundationCard = stack[stack.length - 1];

          if (!foundationCard || dragSuit === foundationCard % 4) {
            const doneCard = this.tableau[this.column].pop();
            this.tableau[this.column] = [...this.tableau[this.column]];
            this.foundation[i].push(doneCard.card);
            this.flipCard();
            break;
          }
        }
      }
      i++;
    }
    this.solitaire.checkWin(this.foundation);
  }

  flipCard() {
    const flipCard = this.tableau[this.column][this.tableau[this.column].length - 1];
    if (flipCard) {
      flipCard.flip = false;
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}