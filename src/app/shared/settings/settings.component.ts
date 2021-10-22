import {
  AfterViewInit,
  ApplicationRef,
  Component,
  ComponentRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatRadioButton } from '@angular/material/radio';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TwentyoneGame } from '@models/twentyone-game';
import { CountStats, TwentyoneStats } from '@models/twentyone-stats';
import { TwentyOneService } from '@services/twenty-one.service';
import * as _ from 'lodash';
import { SliderComponent } from '@shared/slider/slider.component';
import { SolitaireService } from '@services/solitaire.serviice';
import { SolitaireGame } from '@models/solitaire-game';
import { DrawStats, SolitaireStats } from '@models/solitaire-stats';
import { FreeCellGame } from '@models/free-cell-game';
import { FreeCellStats } from '@models/free-cell-stats';
import { FreeCellService } from '@services/free-cell.service';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, AfterViewInit, OnDestroy {
  show = false;
  form: FormGroup;
  currentDeckCount: number;
  currentDrawCount: number;
  destroyed$ = new Subject();
  decks = Array.from({ length: 8 }, (n, i) => i + 1);
  sidebar = false;
  sliders: SliderComponent[] = [];
  @Input() componentRef: ComponentRef<SettingsComponent>;
  @ViewChild('natural') public natural: MatRadioButton;
  @ViewChild('neat') public neat: MatRadioButton;
  @ViewChildren('slider') set itemContent(content: QueryList<SliderComponent>) {
    this.sliders = content ? content.map(item => item) : [];
  }

  constructor(
    private fb: FormBuilder,
    private appRef: ApplicationRef,
    private twentyone: TwentyOneService,
    private solitaire: SolitaireService,
    private freeCell: FreeCellService
  ) {
    this.form = this.fb.group({
      // general
      toolTips: [false],
      alignment: ['natural'],
      cardSize: [false],
      sidebar: false,
      sounds: ['blackjack'],
      // twenty one
      deckCount: [2],
      // solitaire
      drawCount: [1]
    });

    this.currentDeckCount = this.twentyone.gameSettings.deckCount;
    this.currentDrawCount = this.twentyone.gameSettings.drawCount;
    this.form.patchValue(this.twentyone.gameSettings);
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(settings => {
        if (
          settings.deckCount === this.currentDeckCount &&
          settings.drawCount === this.currentDrawCount
        ) {
          this.twentyone.saveSettings(settings);
        }
      });

    this.form.get('deckCount').valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(value => setTimeout(() => {
        const allStats = this.twentyone.gameStats$.getValue();
        const currentGame = this.twentyone.game;
        const currentKey = `${this.currentDeckCount} Deck${this.currentDeckCount !== 1 ? 's' : ''}`;
        const nextKey = `${value} Deck${value !== 1 ? 's' : ''}`;

        if (!currentGame.new) {
          allStats[currentKey] = allStats[currentKey] || new CountStats();
          allStats[currentKey].game = currentGame;
        }

        this.twentyone.allStats = allStats;
        this.twentyone.animate = false;
        this.twentyone.game = allStats[nextKey]?.game || new TwentyoneGame();

        setTimeout(() => {
          this.twentyone.animate = true;
          this.twentyone.saveSettings(this.form.value);
          this.currentDeckCount = value;
        }, 0);
      }));

    this.form.get('drawCount').valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(value => setTimeout(() => {
        const allStats = this.solitaire.gameStats$.getValue();
        const currentGame = this.solitaire.game;
        const currentKey = `Draw ${this.currentDrawCount}`;
        const nextKey = `Draw ${value}`;

        if (!currentGame.new) {
          allStats[currentKey] = allStats[currentKey] || new DrawStats();
          allStats[currentKey].game = currentGame;
        }

        this.solitaire.allStats = allStats;
        this.solitaire.game = allStats[nextKey]?.game || new SolitaireGame();

        setTimeout(() => {
          this.twentyone.saveSettings(this.form.value);
          this.currentDrawCount = value;
        }, 0);
      }));

    setTimeout(() => this.show = true, 0);
  }

  ngAfterViewInit() {
    this[this.form.value.alignment].focus();
  }

  setSidebar() {
    const control = this.form.get('sidebar');
    control.setValue(!this.form.value.sidebar);
  }

  reset21() {
    this.twentyone.game = new TwentyoneGame();
    const allStats = this.twentyone.gameStats$.getValue();
    const key = `${this.form.value.deckCount} Deck${this.form.value.deckCount !== 1 ? 's' : ''}`;
    delete allStats[key];
    this.twentyone.allStats = allStats;
  }

  resetAll21() {
    this.twentyone.game = new TwentyoneGame();
    this.twentyone.allStats = new TwentyoneStats();
  }

  resetSolitaire() {
    this.solitaire.game = new SolitaireGame();
    const allStats = this.solitaire.gameStats$.getValue();
    const key = `Draw ${this.form.value.drawCount}`;
    delete allStats[key];
    this.solitaire.allStats = allStats;
  }

  resetAllSolitaire() {
    this.solitaire.game = new SolitaireGame();
    this.solitaire.allStats = new SolitaireStats();
  }

  resetFreeCell() {
    this.freeCell.game = new FreeCellGame();
    this.freeCell.stats = new FreeCellStats();
  }

  close() {
    this.show = false;

    setTimeout(() => {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
    }, 500);
  }

  trackByFn = (index: number) => index;

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
