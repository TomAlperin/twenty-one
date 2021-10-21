import { ApplicationRef, Component, ComponentRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Settings } from '@models/settings';
import { CountStats } from '@models/twentyone-stats';
import { TwentyOneService } from '@services/twenty-one.service';
import { FreeCellStats } from '@models/free-cell-stats';
import { FreeCellService } from '@services/free-cell.service';

@Component({
  templateUrl: './free-cell-stats.component.html',
  styleUrls: ['./free-cell-stats.component.scss']
})
export class FreeCellStatsComponent implements OnInit, OnDestroy {
  show: boolean;
  stats: FreeCellStats;
  rows = [
    {
      name: 'Total Hands Played',
      value: (value) => `${value.gamesPlayed}`
    },
    {
      name: 'Winning Streak',
      value: (value) => `${value.wins || ''}`
    },
    {
      name: 'Best Winning Streak',
      value: (value) => `${value.maxWins || ''}`
    },
    {
      name: 'Losiing Streak',
      value: (value) => `${value.losses || ''}`
    },
    {
      name: 'Worst Losing Streak',
      value: (value) => `${value.maxLose || ''}`
    },
    {
      name: 'Total Games Won',
      value: (value) => `${value.totalWins}`
    },
    {
      name: 'Total Games Lost',
      value: (value) => `${value.totalLosses}`
    }
  ];
  settings: Settings;
  @Input() componentRef: ComponentRef<FreeCellStatsComponent>;

  destroyed$ = new Subject();

  constructor(
    private freeCell: FreeCellService,
    private twentyone: TwentyOneService,
    private appRef: ApplicationRef,
  ) {
    this.freeCell.gameStats$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((stats: FreeCellStats) => this.stats = stats);

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
