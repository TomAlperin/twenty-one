import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WindowService } from '@services/window.service';
import * as _ from 'lodash';
import { CardComponent } from '@shared/card/card.component';
import { TwentyOneService } from '@services/twenty-one.service';
import { SoundService } from '@services/sound.service';
import { FreeCellService } from '@services/free-cell.service';

@Component({
  selector: 'app-free-cell-group',
  templateUrl: './free-cell-group.component.html',
  styleUrls: ['./free-cell-group.component.scss'],
})
export class FreeCellGroupComponent implements OnDestroy, OnChanges {
  dragging = false;
  dragged = false;
  lastX = 0;
  lastY = 0;
  posX = 0;
  posY = 0;
  timeout: NodeJS.Timer;
  testCol: number;
  undoDrag = false;
  startElement: HTMLElement & EventTarget;
  draggable = true;
  @Input() tableau: { card: number, flip: boolean }[][] = [];
  @Input() foundation: any[][] = [];
  @Input() cards: { card: number, flip: boolean }[] = [];
  @Input() column: number;
  @Input() animate: boolean;
  @Input() cardSound: boolean;
  @Input() width: number;
  @Input() offset: number;
  @Input() index: number;
  @Input() freeCells: number[] = [];
  @ViewChild('card') card: CardComponent;
  @ViewChild('group', { static: false }) group: FreeCellGroupComponent;

  destroyed$ = new Subject();

  constructor(
    private window: WindowService,
    private freeCell: FreeCellService,
    private twentyone: TwentyOneService,
    private soundService: SoundService,
  ) {
    this.window.mousetouchmove$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((event: MouseEvent & TouchEvent) => this.doDrag(event));

    this.window.mousetouchend$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((event: MouseEvent & TouchEvent) => this.endDrag(event));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.cards) {
      setTimeout(() => {
        const card = Math.floor(this.cards[0].card / 4);
        const cardSuit = this.cards[0].card % 4;
        const nextCard = Math.floor(this.cards?.[1]?.card / 4);
        const nextCardSuit = this.cards?.[1]?.card % 4;
        if (isNaN(nextCard)) {
          this.draggable = true;
        } else if (nextCard === card - 1 && nextCardSuit % 2 !== cardSuit % 2) {
          this.draggable = true;
        } else {
          this.draggable = false;
        }
      }, 0);
    }
  }

  get freeCellsLength() {
    return this.freeCells.filter(cell => cell === 0).length;
  }

  start(event) {
    event.preventDefault();
    if (this.index <= this.freeCellsLength && this.draggable) {
      this.startElement = event.target;

      this.dragging = true;
      document.body.classList.add('dragging');
      this.soundService.playSound('card-sound');
    }
  }

  doDrag(event: MouseEvent & TouchEvent) {
    if (this.dragging) {
      const clientX = event.clientX || _.get(event, 'touches[0].clientX');
      const clientY = event.clientY || _.get(event, 'touches[0].clientY');
      const draggable = event.clientX !== undefined || !event.touches[1];

      if (Math.abs(this.posX) > 10 || Math.abs(this.posY) > 10) {
        this.dragged = true;
      }
      clearTimeout(this.timeout);
      if (draggable && this.lastX && !this.cards[0].flip) {
        this.posX += clientX - this.lastX;
        this.posY += clientY - this.lastY;
      }
      this.lastX = clientX;
      this.lastY = clientY;
    }
  }

  async endDrag(event: MouseEvent & TouchEvent) {
    document.body.classList.remove('dragging');
    let element;
    let reset = true;
    const changedTouch = _.get(event, 'changedTouches[0]');

    if (changedTouch) {
      element = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
    } else if (!changedTouch) {
      element = document.elementFromPoint(event.clientX, event.clientY);
    }

    this.posX = 0;
    this.posY = 0;
    this.lastX = 0;
    this.lastY = 0;

    if (this.dragging && element) {
      if (!this.dragged) {
        this.toFoundation();
      } else {
        let column: string | number = null;

        if (element) {
          column = (element as HTMLElement).getAttribute('data-column');
        }

        if (column !== null) {
          column = +column;
          const dragCard = this.cards[0].card;
          const dragValue = Math.floor(dragCard / 4);
          const dragSuit = dragCard % 4;

          if (column > 7) {
            if (this.cards.length === 1) {
              if (this.foundation[column - 8].length + 1 === dragValue) {
                const foundationCard = this.foundation[column - 8][this.foundation[column - 8].length - 1];

                if (!foundationCard || dragSuit === _.get(foundationCard, 'card', foundationCard) % 4) {
                  const card = this.tableau[this.column].pop();
                  this.tableau[this.column] = [...this.tableau[this.column]];
                  this.foundation[column - 8].push(card.card);
                  this.freeCell.checkWin(this.foundation);
                  reset = false;
                }
              }
            }
          } else if (column < 0) {
            const freeCellCard = this.freeCells[-column - 1];

            if (!freeCellCard) {
              const card = this.tableau[this.column].pop();
              this.tableau[this.column] = [...this.tableau[this.column]];
              this.freeCells[-column - 1] = card.card;
            }
            this.freeCell.checkWin(this.foundation);
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
              (dropValue === 0)
            ) {
              const cards = this.tableau[this.column].splice(-this.cards.length);
              this.tableau[this.column] = [...this.tableau[this.column]];

              this.tableau[column].push(...cards);
              this.tableau[column] = [...this.tableau[column]];
              this.freeCell.checkWin(this.foundation);
              reset = false;
            }
          }
        }

        if (reset) {
          this.resetDrag();
        }
      }
      this.posX = 0;
      this.posY = 0;
      this.lastX = 0;
      this.lastY = 0;
    }
    this.dragging = false;
    this.dragged = false;
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
      this.timeout = setTimeout(() => {
        this.undoDrag = false;
      }, 180);
    }, 0);
  }

  toFoundation() {
    const dragCard = this.cards[this.cards.length - 1].card;
    const dragValue = Math.floor(dragCard / 4);
    const dragSuit = dragCard % 4;
    let i = 0;
    let playSound = true;

    for (const stack of this.foundation) {
      if (this.cards.length === 1) {
        if (stack.length + 1 === dragValue) {
          const foundationCard = stack[stack.length - 1];
          const cardValue = _.get(foundationCard, 'card', foundationCard);

          if ((!cardValue) || dragSuit === cardValue % 4) {
            const destination = document.getElementsByClassName(`foundation-${i}`)[0];
            const { left: sLeft, top: sTop } = this.startElement.getBoundingClientRect();
            const { left: dLeft, top: dTop } = destination.getBoundingClientRect();

            const offsetX = (sLeft - dLeft);
            const offsetY = (sTop - dTop);

            const doneCard = this.tableau[this.column].pop();
            this.tableau[this.column] = [...this.tableau[this.column]];
            this.foundation[i].push({
              card: doneCard.card,
              offsetX,
              offsetY,
              deg: this.twentyone.gameSettings.alignment === 'neat' ? 0 : this.card.rand2,
              scale: 1.4
            });
            this.freeCell.checkWin(this.foundation);
            playSound = false;
            break;
          }
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
