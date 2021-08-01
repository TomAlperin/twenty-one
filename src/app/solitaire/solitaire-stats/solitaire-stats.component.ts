import { ApplicationRef, Component, ComponentRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Settings } from '@models/settings';
import { TwentyoneStats, CountStats } from '@models/twentyone-stats';
import { TwentyOneService } from '@services/twenty-one.service';
import { SolitaireService } from '@services/solitaire.serviice';
import { SolitaireStats } from '@models/solitaire-stats';

@Component({
  templateUrl: './solitaire-stats.component.html',
  styleUrls: ['./solitaire-stats.component.scss']
})
export class SolitaireStatsComponent implements OnInit, OnDestroy {
  show: boolean;
  stats: SolitaireStats;
  rows = [
    {
      name: 'Total Hands Played',
      value: (element: { key: string, value: CountStats }) => `${element.value.gamesPlayed}`
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
  settings: Settings;
  @Input() componentRef: ComponentRef<SolitaireStatsComponent>;

  destroyed$ = new Subject();

  constructor(
    private solitaire: SolitaireService,
    private twentyone: TwentyOneService,
    private appRef: ApplicationRef,
  ) {
    this.solitaire.gameStats$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((stats: SolitaireStats) => this.stats = stats);

    this.twentyone.settings$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(settings => this.settings = settings);
  }

  ngOnInit(): void {
    setTimeout(() => this.show = true, 0);
  }

  close() {
    this.show = false;
    setTimeout(() => {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
    }, 180);
  }

  setSidebar() {
    this.settings.sidebar = !this.settings.sidebar;
    this.twentyone.saveSettings(this.settings);
  }

  trackByFn = (index: number) => index;

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
