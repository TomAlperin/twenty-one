import { Directive, ElementRef, OnInit } from '@angular/core';
import { AnimationPlayer, AnimationBuilder, AnimationMetadata, style, animate } from '@angular/animations';


@Directive({
  selector: '[appFadeIn]',
})
export class FadeInDirective implements OnInit {
  player: AnimationPlayer;

  constructor(private builder: AnimationBuilder, private el: ElementRef) { }

  ngOnInit() {
    const metadata = this.slideIn();
    const factory = this.builder.build(metadata);
    const player = factory.create(this.el.nativeElement);
    player.play();
  }

  private slideIn(): AnimationMetadata[] {
    return [
      style({ opacity: 0 }),
      animate('500ms ease-in-out', style({ opacity: 1 })),
    ];
  }
}
