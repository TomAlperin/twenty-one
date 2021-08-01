import { ApplicationRef, Component, ComponentRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-twenty-one-help',
  templateUrl: './twenty-one-help.component.html',
  styleUrls: ['./twenty-one-help.component.scss']
})
export class TwentyOneHelpComponent implements OnInit {
  show = false;
  @Input() componentRef: ComponentRef<TwentyOneHelpComponent>;

  constructor(private appRef: ApplicationRef) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.show = true;
    }, 0);
  }

  hide() {
    this.show = false;
    setTimeout(() => {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
    }, 300);
  }
}
