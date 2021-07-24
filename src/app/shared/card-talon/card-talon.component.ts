import { Component, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WindowService } from '@services/window.service';
import * as _ from 'lodash';
import { SolitaireService } from '@services/solitaire.serviice';

@Component({
  selector: 'app-card-talon',
  templateUrl: './card-talon.component.html',
  styleUrls: ['./card-talon.component.scss']
})
export class CardTalonComponent implements OnDestroy {
  dragging = false;
  dragged = false;
  lastX = 0;
  lastY = 0;
  posX = 0;
  posY = 0;
  @Input() tableau: { card: number, flip: boolean }[][] = [];
  @Input() foundation: number[][] = [];
  @Input() cards: number[] = [];
  @Input() column: number;
  @Input() width: number;

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
  }

  start(event: MouseEvent & TouchEvent) {
    event.preventDefault();
    if (this.cards.length) {
      this.dragging = true;
    }
  }

  doDrag(event: MouseEvent & TouchEvent) {
    event.preventDefault();
    const clientX = event.clientX || _.get(event, 'touches[0].clientX');
    const clientY = event.clientY || _.get(event, 'touches[0].clientY');

    if (this.dragging) {
      this.dragged = true;
      if (this.lastX) {
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

    if (this.dragging) {
      this.posX = 0;
      this.posY = 0;
      this.lastX = 0;
      this.lastY = 0;

      if (!this.dragged) {
        this.toFoundation();
      } else {
        const column = (element as HTMLImageElement).getAttribute('data-column');

        if (column) {
          const dragCard = this.cards[this.cards.length - 1];
          const dragValue = Math.floor(dragCard / 4);
          const dragSuit = dragCard % 4;

          if (+column > 6) {
            if (this.foundation[+column - 7].length + 1 === dragValue) {
              const foundationCard = this.foundation[+column - 7][this.foundation[+column - 7].length - 1];

              if (!foundationCard || dragSuit === foundationCard % 4) {
                const card = this.cards.pop();
                this.foundation[+column - 7].push(card);
                console.log(card);
              }
            }
            return;
          }

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
            const card = this.cards.pop();
            this.tableau[column].push({ card, flip: false });
            this.tableau[column] = [...this.tableau[column]];
          }
        }
      }
      this.dragging = false;
      this.dragged = false;
    }
    this.solitaire.checkWin(this.foundation);
  }

  toFoundation() {
    const dragCard = this.cards[this.cards.length - 1];
    const dragValue = Math.floor(dragCard / 4);
    const dragSuit = dragCard % 4;
    let i = 0;

    for (const stack of this.foundation) {
      if (stack.length + 1 === dragValue) {
        const foundationCard = stack[stack.length - 1];

        if (!foundationCard || dragSuit === foundationCard % 4) {
          const doneCard = this.cards.pop();
          this.foundation[i].push(doneCard);
          break;
        }
      }
      i++;
    }
    this.solitaire.checkWin(this.foundation);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
