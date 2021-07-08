import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TwentyOneService } from 'src/app/services/twenty-one.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  show = false;
  form: FormGroup;
  destroyed$ = new Subject();

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
    private fb: FormBuilder,
    private twentyone: TwentyOneService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      alignment: ['natural'],
      cardSize: [false],
      sounds: ['classic'],
      deckCount: [2]
    });

    this.form.patchValue(this.twentyone.gameSettings);

    this.form.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(settings => {
        this.twentyone.saveSettings(settings);
      });
    setTimeout(() => this.show = true, 0);
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
