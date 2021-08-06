import { AfterViewInit, ApplicationRef, Component, ComponentRef, Input } from '@angular/core';
import { ShuffleCardsComponent } from '@shared/shuffle-cards/shuffle-cards.component';

@Component({
  templateUrl: './load-bar.component.html',
  styleUrls: ['./load-bar.component.scss']
})
export class LoadBarComponent implements AfterViewInit {
  interval: NodeJS.Timer;
  show = false;
  percentLoaded = 0;
  @Input() available: {
    appData: {
      version: string,
      notes: string
    }
  };
  @Input() current: {
    appData: {
      version: string,
      notes: string
    }
  };
  @Input() notes: string;
  @Input() componentRef: ComponentRef<ShuffleCardsComponent>;
  @Input() timeout = 10;

  constructor(private appRef: ApplicationRef) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.show = true;

      this.interval = setInterval(() => {
        this.percentLoaded += 10;

        if (this.percentLoaded >= 100) {
          setTimeout(() => {
            this.show = false;
            setTimeout(() => {
              clearTimeout(this.interval);
              this.appRef.detachView(this.componentRef.hostView);
              this.componentRef.destroy();
            }, 300);
          }, 2000);
        }
      }, this.timeout);
    }, 1);
  }

}
