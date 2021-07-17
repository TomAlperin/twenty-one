import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TwentyoneSettings } from 'src/app/models/twentyone-settings';
import { TwentyoneStats, CountStats } from 'src/app/models/twentyone-stats';
import { TwentyOneService } from 'src/app/services/twenty-one.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  show: boolean;
  stats: TwentyoneStats;
  rows = [
    {
      name: 'High Score',
      value: (element: { key: string, value: CountStats }) => `$${element.value.highScore}`
    },
    {
      name: 'Total Won',
      value: (element: { key: string, value: CountStats }) => `$${element.value.totalWon}`
    },
    {
      name: 'Total Lost',
      value: (element: { key: string, value: CountStats }) => `$${element.value.totalLost}`
    },
    {
      name: 'Total Hands Played',
      value: (element: { key: string, value: CountStats }) => `${element.value.bestHandCount}`
    },
    {
      name: 'Hands Played This Game',
      value: (element: { key: string, value: CountStats }) => `${element.value.curHandCount}`
    },
    {
      name: 'Times Went Broke',
      value: (element: { key: string, value: CountStats }) => `${element.value.gamesPlayed || ''}`
    },
    {
      name: 'Winning Streak',
      value: (element: { key: string, value: CountStats }) => `${element.value.wins || ''}`
    },
    {
      name: 'Best Winning Streak',
      value: (element: { key: string, value: CountStats }) => `${element.value.maxWins || ''}`
    },
    {
      name: 'Losiing Streak',
      value: (element: { key: string, value: CountStats }) => `${element.value.losses || ''}`
    },
    {
      name: 'Worst Losing Streak',
      value: (element: { key: string, value: CountStats }) => `${element.value.maxLose || ''}`
    },
    {
      name: 'Total Games Won',
      value: (element: { key: string, value: CountStats }) => `${element.value.totalWins}`
    },
    {
      name: 'Total Games Lost',
      value: (element: { key: string, value: CountStats }) => `${element.value.totalLosses}`
    }
  ];
  settings: TwentyoneSettings;

  destroyed$ = new Subject();

  constructor(
    private twentyone: TwentyOneService,
    private renderer: Renderer2,
    private el: ElementRef,
  ) {
    this.twentyone.gameStats$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((stats: TwentyoneStats) => this.stats = stats);

    this.twentyone.settings$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(settings => this.settings = settings);
  }

  ngOnInit(): void {
    setTimeout(() => this.show = true, 0);
  }

  close() {
    this.show = false;
    this.destroyed$.next();
    this.destroyed$.complete();
    setTimeout(() => {
      this.renderer.removeChild(document.body, this.el.nativeElement);
    }, 180);
  }

  setSidebar() {
    this.settings.sidebar = !this.settings.sidebar;
    this.twentyone.saveSettings(this.settings);
  }

  trackByFn = (index: number) => index;
}
