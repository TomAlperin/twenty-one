import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { Howl } from 'howler';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.scss']
})
export class BlackjackComponent implements AfterViewInit {

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
  ) { }

  ngAfterViewInit(): void {
    this.blackjack();
  }

  blackjack() {
    let i = 0;
    setTimeout(() => {
      const sound = new Howl({
        src: ['/assets/snd/blackjack.mp3'],
        sprite: {
          blackjack: [8500, 12000]
        }
      });

      const settings = JSON.parse(atob(localStorage.settings));

      if (settings.sounds !== 'off') {
        sound.play('blackjack');
      }

      document.getElementsByClassName('blackjack')[0].classList.add('GBZoom');
      const timer = setInterval(() => {
        i++;
        switch (i) {
          case 1:
            document.getElementsByClassName('prop')[0].classList.add('prop1');
            break;
          case 2:
            document.getElementsByClassName('prop')[0].classList.remove('prop1');
            document.getElementsByClassName('prop')[0].classList.add('prop2');
            break;
          default:
            document.getElementsByClassName('prop')[0].classList.remove('prop2');
            i = 0;
            break;
        }
      }, 10);
      setTimeout(() => {
        this.renderer.removeChild(document.body, this.elRef.nativeElement);
        clearInterval(timer);
      }, 6000);
    }, 2000);
  }
}
