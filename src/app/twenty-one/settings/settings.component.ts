import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatRadioButton } from '@angular/material/radio';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TwentyoneGame } from 'src/app/models/twentyone-game';
import { CountStats, TwentyoneStats } from 'src/app/models/twentyone-stats';
import { TwentyOneService } from 'src/app/services/twenty-one.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, AfterViewInit {
  show = false;
  form: FormGroup;
  currentDeckCount: number;
  destroyed$ = new Subject();
  decks = Array.from({ length: 8 }, (n, i) => i + 1);
  sidebar = false;
  @ViewChild('natural') public natural: MatRadioButton;
  @ViewChild('neat') public neat: MatRadioButton;

  constructor(
    private el: ElementRef,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private twentyone: TwentyOneService
  ) {
    this.form = this.fb.group({
      toolTips: [false],
      alignment: ['natural'],
      cardSize: [false],
      sounds: ['blackjack'],
      deckCount: [2],
      sidebar: false
    });

    this.currentDeckCount = this.twentyone.gameSettings.deckCount;
    this.form.patchValue(this.twentyone.gameSettings);
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(settings => {
        if (settings.deckCount === this.currentDeckCount) {
          this.twentyone.saveSettings(settings);
        }
      });

    this.form.get('deckCount').valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(value => setTimeout(() => {
        const allStats = this.twentyone.gameStats.getValue();
        const currentGame = this.twentyone.gameState;
        const currentKey = `${this.currentDeckCount} Deck${this.currentDeckCount !== 1 ? 's' : ''}`;
        const nextKey = `${value} Deck${value !== 1 ? 's' : ''}`;

        if (!currentGame.new) {
          allStats[currentKey] = allStats[currentKey] || new CountStats();
          allStats[currentKey].game = currentGame;
        }

        this.twentyone.allStats = allStats;
        this.twentyone.animate = false;
        this.twentyone.gameState = allStats[nextKey]?.game || new TwentyoneGame();

        setTimeout(() => {
          this.twentyone.animate = true;
          this.twentyone.saveSettings(this.form.value);
          this.currentDeckCount = value;
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

  gameReset() {
    this.twentyone.gameState = new TwentyoneGame();
    const allStats = this.twentyone.gameStats.getValue();
    const key = `${this.form.value.deckCount} Deck${this.form.value.deckCount !== 1 ? 's' : ''}`;
    delete allStats[key];
    this.twentyone.allStats = allStats;
  }

  allReset() {
    this.twentyone.gameState = new TwentyoneGame();
    this.twentyone.allStats = new TwentyoneStats();
  }

  close() {
    this.show = false;
    this.destroyed$.next();
    this.destroyed$.complete();

    setTimeout(() => {
      this.renderer.removeChild(document.body, this.el.nativeElement);
    }, 500);
  }

  trackByFn = (index: number) => index;
}
