import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import { Result } from '@models/twentyone-game';
import { TwentyOneService } from './twenty-one.service';

@Injectable({ providedIn: 'root' })
export class SoundService {
  constructor(private twentyone: TwentyOneService) { }

  playSound(snd: Result) {
    const soundsOn = this.twentyone.gameSettings.sounds !== 'off';
    if (soundsOn) {
      const sound = new Howl({
        src: [`/assets/snd/${this.twentyone.gameSettings.sounds}.mp3`],
        sprite: {
          'card-sound': [0, 800],
          bet: [1000, 800],
          tie: [1000, 800],
          win: [2000, 2800],
          lose: [5000, 2800],
          blackjack: [8500, 12000]
        }
      });

      sound.play(snd);
    }
    return this.twentyone.gameSettings.sounds !== 'off';
  }
}



