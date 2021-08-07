import { AfterViewInit, ApplicationRef, Component, ComponentRef, Input } from '@angular/core';
import { ShuffleCardsComponent } from '@shared/shuffle-cards/shuffle-cards.component';

@Component({
  templateUrl: './update-notes.component.html',
  styleUrls: ['./update-notes.component.scss']
})
export class UpdateNotesComponent implements AfterViewInit {
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
  @Input() cb = () => { };

  constructor(private appRef: ApplicationRef) {
  }

  ngAfterViewInit() {
    setTimeout(() => this.show = true, 1);
  }

  hide() {
    this.show = false;
    setTimeout(() => {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
    }, 300);
  }

  update() {
    this.hide();
    setTimeout(() => this.cb(), 1000);
  }
}
