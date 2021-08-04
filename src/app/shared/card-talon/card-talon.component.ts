import { Component, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WindowService } from '@services/window.service';
import * as _ from 'lodash';
import { SolitaireService } from '@services/solitaire.serviice';
import { SoundService } from '@services/sound.service';

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
  startElement: HTMLElement & EventTarget;
  undoDrag = false;
  timeout: NodeJS.Timer;
  @Input() tableau: { card: number, flip: boolean }[][] = [];
  @Input() foundation: any[][] = [];
  @Input() cards: number[] = [];
  @Input() column: number;
  @Input() animate: boolean;

  destroyed$ = new Subject();

  constructor(
    private window: WindowService,
    private solitaire: SolitaireService,
    private soundService: SoundService
  ) {
    this.window.mousetouchmove$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((event: MouseEvent & TouchEvent) => this.doDrag(event));

    this.window.mousetouchend$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((event: MouseEvent & TouchEvent) => this.endDrag(event));
  }

  start(event) {
    event.preventDefault();

    this.startElement = event.target;

    if (this.cards.length) {
      document.body.classList.add('dragging');
      this.dragging = true;
      this.soundService.playSound('card-sound');
    }
  }

  doDrag(event: MouseEvent & TouchEvent) {
    event.preventDefault();
    const clientX = event.clientX || _.get(event, 'touches[0].clientX');
    const clientY = event.clientY || _.get(event, 'touches[0].clientY');
    const draggable = event.clientX !== undefined || !event.touches[1];

    if (Math.abs(this.lastX) > 10 || Math.abs(this.lastY) > 10) {
      this.dragged = true;
    }

    if (this.dragging && draggable) {
      if (this.lastX) {
        this.posX += clientX - this.lastX;
        this.posY += clientY - this.lastY;
      }
      this.lastX = clientX;
      this.lastY = clientY;
    }
  }

  endDrag(event: MouseEvent & TouchEvent) {
    document.body.classList.remove('dragging');
    let element;
    let reset = true;
    const changedTouch = _.get(event, 'changedTouches[0]');

    if (changedTouch) {
      element = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
    } else {
      element = document.elementFromPoint(event.x, event.y);
    }

    if (this.dragging) {
      if (!this.dragged) {
        this.toFoundation();
      } else {
        let column;

        if (element) {
          column = (element as HTMLImageElement).getAttribute('data-column');
        }

        if (column) {
          const dragCard = this.cards[this.cards.length - 1];
          const dragValue = Math.floor(dragCard / 4);
          const dragSuit = dragCard % 4;

          if (+column > 6) {
            if (this.foundation[+column - 7].length + 1 === dragValue) {
              const foundationCard = this.foundation[+column - 7][this.foundation[+column - 7].length - 1];

              if (!foundationCard || dragSuit === _.get(foundationCard, 'card', foundationCard) % 4) {
                const card = this.cards.pop();
                this.foundation[+column - 7].push(card);
              }
            }

            this.dragging = false;
            this.dragged = false;
            this.posX = 0;
            this.posY = 0;
            this.lastX = 0;
            this.lastY = 0;

            this.solitaire.checkWin(this.foundation);
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
              const card = this.cards.pop();
              this.tableau[column].push({ card, flip: false });
              this.tableau[column] = [...this.tableau[column]];
              this.solitaire.checkWin(this.foundation);
              reset = false;
            }
          }
        }

        if (reset) {
          this.resetDrag();
        }
      }
    }
    this.dragging = false;
    this.dragged = false;
    this.posX = 0;
    this.posY = 0;
    this.lastX = 0;
    this.lastY = 0;
  }

  resetDrag() {
    setTimeout(() => this.soundService.playSound('card-sound'), 180);
    this.undoDrag = true;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.posX = 0;
      this.posY = 0;
      this.lastX = 0;
      this.lastY = 0;
      this.timeout = setTimeout(() => this.undoDrag = false, 180);
    }, 0);
  }

  async toFoundation() {
    const dragCard = this.cards[this.cards.length - 1];
    const dragValue = Math.floor(dragCard / 4);
    const dragSuit = dragCard % 4;
    let i = 0;
    let playSound = true;

    for (const stack of this.foundation) {
      if (stack.length + 1 === dragValue) {
        const foundationCard = stack[stack.length - 1];

        if (!foundationCard || dragSuit === _.get(foundationCard, 'card', foundationCard) % 4) {
          const destination = document.getElementsByClassName(`foundation-${i}`)[0];
          const { left: sLeft, top: sTop } = this.startElement.getBoundingClientRect();
          const { left: dLeft, top: dTop } = destination.getBoundingClientRect();
          const offsetX = (sLeft - dLeft);
          const offsetY = (sTop - dTop);

          const card = this.cards.pop();
          this.foundation[i].push({
            card,
            offsetX,
            offsetY,
            deg: 0,
            scale: 1.1
          });
          playSound = false;
          this.solitaire.checkWin(this.foundation);
          break;
        }
      }
      i++;
    }

    if (playSound) {
      this.soundService.playSound('card-sound');
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
