import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-shuffle-cards',
  templateUrl: './shuffle-cards.component.html',
  styleUrls: ['./shuffle-cards.component.scss']
})
export class ShuffleCardsComponent implements OnInit {

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.renderer.removeChild(document.body, this.elRef.nativeElement), 3000);
  }
}
