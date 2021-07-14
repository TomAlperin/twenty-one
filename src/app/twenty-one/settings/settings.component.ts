import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatRadioButton } from '@angular/material/radio';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TwentyOneService } from 'src/app/services/twenty-one.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, AfterViewInit {
  show = false;
  form: FormGroup;
  destroyed$ = new Subject();
  @ViewChild('natural') public natural: MatRadioButton;
  @ViewChild('neat') public neat: MatRadioButton;

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
    private fb: FormBuilder,
    private twentyone: TwentyOneService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      toolTips: [false],
      alignment: ['natural'],
      cardSize: [false],
      sounds: ['blackjack'],
      deckCount: [2]
    });

    this.form.patchValue(this.twentyone.gameSettings);

    this.form.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(settings => {
        this.twentyone.saveSettings(settings);
      });

    this.form.get('deckCount').valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(value => setTimeout(() => this.twentyone.shuffleCards()));
    setTimeout(() => this.show = true, 0);
  }

  ngAfterViewInit() {
    this[this.form.value.alignment].focus();
  }

  shuffle() {
    this.twentyone.shuffleCards();
  }

  resetStats() {
    this.twentyone.stats = { result: 'reset' };
  }

  close() {
    this.show = false;
    setTimeout(() => {
      this.renderer.removeChild(document.body, this.elRef.nativeElement);
    }, 180);
  }

  ngOnDestroyed() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
