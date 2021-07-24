import { Component, OnDestroy, OnInit } from '@angular/core';
import { Result, TwentyoneGame } from '@models/twentyone-game';
import { TwentyOneService } from '@services/twenty-one.service';
import { BlackjackComponent } from './blackjack/blackjack.component';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TwentyoneSettings } from '@models/twentyone-settings';
import { Router } from '@angular/router';
import { StatsComponent } from './stats/stats.component';
import { TwentyoneStats } from '@models/twentyone-stats';
import { WindowService } from '@services/window.service';
import { SoundService } from '@services/sound.service';
// tslint:disable-next-line:no-string-literal
const mobile = typeof window.orientation !== 'undefined';

@Component({
  selector: 'app-twenty-one',
  templateUrl: './twenty-one.component.html',
  styleUrls: ['./twenty-one.component.scss']
})
export class TwentyOneComponent implements OnInit, OnDestroy {
  controls = [];
  betControls = [
    { class: 'chip10', action: 'bet', value: 10, states: ['bet', 'deal'], tooltip: 'Bet $10' },
    { class: 'chip50', action: 'bet', value: 50, states: ['bet', 'deal'], tooltip: 'Bet $50' },
    { class: 'chip100', action: 'bet', value: 100, states: ['bet', 'deal'], tooltip: 'Bet $100' },
    { class: 'chip500', action: 'bet', value: 500, states: ['bet', 'deal'], tooltip: 'Bet $500' },
    { class: 'deal-cards', action: 'deal', label: 'Deal', states: ['deal'], tooltip: 'Deal Cards' },
    { class: 'deal-cards', action: 'hit', value: 'userCards', label: 'Hit', states: ['hit'], tooltip: 'Hit' },
    { class: 'deal-cards', action: 'stand', value: 'userCards', label: 'Stand', states: ['hit'], tooltip: 'Stand' },
    {
      class: 'deal-cards', action: 'double', value: 'userCards', label: 'Double', states: ['hit'],
      condition: 'canDouble', tooltip: 'Double your bet and draw only one more card.'
    },
    { class: 'deal-cards', action: 'hit', value: 'splitCards', label: 'Hit', states: ['hit-on-split'], tooltip: 'Hit' },
    { class: 'deal-cards', action: 'stand', value: 'splitCards', label: 'Stand', states: ['hit-on-split'], tooltip: 'Stand' },
    {
      class: 'deal-cards', action: 'double', value: 'splitCards', label: 'Double', states: ['hit-on-split'],
      condition: 'canDoubleSplit', tooltip: 'Double your bet and draw only one more card.'
    },
    {
      class: 'deal-cards', action: 'split', label: 'Split', states: ['hit', 'hit-on-split'],
      condition: 'canSplit', tooltip: 'Split and play two hands. Doubles bet.'
    },
    {
      class: 'surrender', action: 'surrender', label: 'Surrender', states: ['hit', 'hit-on-split'],
      condition: 'canSurrender', tooltip: 'Give up and recover half your bet.'
    },
    { class: 'a-button', action: 'about', states: ['bet'], tooltip: 'About' }
  ];
  dealControl = { class: 'deal-cards', action: 'deal', label: 'Deal' };
  game = new TwentyoneGame();
  placeholders = Array.apply(null, Array(7));
  disabled = false;
  cardSound = false;
  flip = true;
  height = 200;
  hasStats = false;
  settings = new TwentyoneSettings();
  destroyed$ = new Subject();
  position: 'above' | 'left' = 'left';

  constructor(
    public twentyone: TwentyOneService,
    private router: Router,
    private window: WindowService,
    private soundService: SoundService,
  ) {
    this.subscribeToOrientationResize();
    this.subscribeToGame();
    this.subscribeToSettings();
    this.subscribeToStats();

    if (this.game.state === 'bet') {
      this.flip = false;
    }

    this.setHeight();

    setTimeout(() => this.twentyone.animate = true, 0);
  }

  ngOnInit(): void {
    this.controls = this.betControls;
  }

  setHeight() {
    const height = window.innerHeight;
    const width = window.innerWidth;

    this.position = height < width ? 'left' : 'above';

    if (height < width) {
      this.height = Math.min((height / 2) - 30, 350) - 40;
    } else {
      this.height = (height / 3) - 52;
    }
  }

  subscribeToOrientationResize() {
    this.window.orientationresize$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(event => this.setHeight());
  }

  subscribeToGame() {
    this.twentyone.game$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(game => this.game = game);
  }

  subscribeToSettings() {
    this.twentyone.settings$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((settings: TwentyoneSettings) => {
        this.settings = settings;

        if (this.settings.sounds !== 'off') {
          this.cardSound = true;
        }
      });
  }

  subscribeToStats() {
    this.twentyone.gameStats$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((stats: TwentyoneStats) => {
        this.hasStats = !_.isEmpty(stats);

        if (this.settings.sounds !== 'off') {
          this.cardSound = true;
        }
      });
  }


  do(action: string, value?: number) {
    if (value) {
      this[action](value);
    } else {
      this[action]();
    }
  }

  bet(value: number) {
    const pick = ['bank', 'deck'];

    if (this.game.state === 'bet') {
      this.game = new TwentyoneGame(_.pick(this.game, pick));
      this.flip = true;
    }

    if (this.game.new) {
      delete this.game.new;
    }

    if (this.game.bank >= value) {
      this.game.bet += value;
      this.game.bank -= value;
      this.playSound('bet');
    }
    this.game.state = 'deal';
    this.twentyone.saveGame(this.game);
  }

  async deal() {   // bet or deal
    this.disabled = true;
    await this.getCard(this.game.dealerCards, 0);
    await this.getCard(this.game.dealerCards, 400);
    await this.getCard(this.game.userCards, 400);
    await this.getCard(this.game.userCards, 400);

    setTimeout(() => {
      this.game.state = 'hit';
      if (Math.floor(this.game.dealerCards[0] / 4) === 1 && this.game.bank >= this.game.bet / 2) {
        this.game.canInsure = true;
      }
      this.twentyone.saveGame(this.game);
      this.disabled = false;
    }, 400);
  }

  async hit(hand: string) {
    this.disabled = true;
    if (!this.game.insured) {
      this.game.canInsure = false;
    }
    await this.getCard(this.game[hand], 0);

    const playerTot = this.twentyone.checkTotal(this.game[hand]);
    if (playerTot > 21 || this.game[hand].length === 7) {
      if (this.game.state === 'hit-on-split') {
        this.game.state = 'hit';
        const dealerTot = this.twentyone.checkTotal(this.game.dealerCards);
        const splitTot = this.twentyone.checkTotal(this.game.splitCards);
        await new Promise((resolve) => setTimeout(resolve, 400));
        await this.checkWinning(this.game.splitCards.length, splitTot, dealerTot, 'splitResult');
        this.twentyone.saveGame(this.game);
      } else {
        await this.doDealer();
      }
    } else {
      this.twentyone.saveGame(this.game);
    }
    this.disabled = false;
  }

  async double(hand: string) {
    this.disabled = true;
    if (!this.game.insured) {
      this.game.canInsure = false;
    }
    await this.getCard(this.game[hand], 300);
    this.game.bank -= this.game.bet;
    hand === 'userCards' ? this.game.bet *= 2 : this.game.splitBet *= 2;

    if (this.game.state === 'hit-on-split') {
      this.game.state = 'hit';
    } else {
      this.doDealer();
    }
    this.twentyone.saveGame(this.game);
    this.disabled = false;
  }

  async split() {
    this.disabled = true;
    this.twentyone.animate = false;

    if (!this.game.insured) {
      this.game.canInsure = false;
    }

    this.game.bank -= this.game.bet;
    this.game.splitBet = this.game.bet;
    this.game.splitCards.push(...this.game.userCards.splice(0));
    this.game.state = 'hit-on-split';
    this.game.split = true;

    await new Promise((resolve) => setTimeout(resolve, 200));
    this.twentyone.animate = true;
    await new Promise((resolve) => setTimeout(resolve, 200));

    this.game.userCards.push(this.game.splitCards.pop());
    await this.getCard(this.game.splitCards, 400);
    await this.getCard(this.game.userCards, 400);
    this.twentyone.saveGame(this.game);
    this.disabled = false;
  }

  insure() {
    if (!this.game.insured) {
      this.playSound('bet');
      this.game.insured = true;
      this.game.bank -= this.game.bet / 2;
      this.twentyone.saveGame(this.game);
    }
  }

  async surrender() {
    const dealerTot = this.twentyone.checkTotal(this.game.dealerCards);
    let snd: Result;
    let msg: string;
    let icon: string;
    let newBank: number;
    this.disabled = true;

    await new Promise((resolve) => setTimeout(resolve, 400));

    this.flip = false;
    this.playSound('card-sound');

    if (this.game.dealerCards.length === 2 && dealerTot === 21) {
      snd = 'lose';
      msg = 'Surrender Denied';
      icon = 'sad';
    } else {
      snd = 'win';
      icon = 'happy';
      newBank = this.game.bank + this.game.bet / 2;
      msg = 'Surrendered';
    }
    setTimeout(() => this.endHand(snd, msg, icon, 'result', newBank), 400);
    this.game.state = 'bet';
    this.twentyone.saveGame(this.game);
    this.disabled = false;
  }

  async stand(hand: string) {
    this.disabled = true;

    if (!this.game.insured) {
      this.game.canInsure = false;
    }

    if (this.game.state === 'hit-on-split') {
      this.game.state = 'hit';
      this.twentyone.saveGame(this.game);
    } else {
      await this.doDealer();
    }

    this.disabled = false;
  }


  async getCard(hand, t) {
    if (this.game.deck.length === 0) {
      this.twentyone.shuffleCards();
    }
    const card = this.game.deck.pop();
    await new Promise((resolve) => setTimeout(resolve, t));
    hand.push(card);
  }

  async doDealer() {
    const playerTot = this.twentyone.checkTotal(this.game.userCards);
    const splitTot = this.twentyone.checkTotal(this.game.splitCards);
    let dealerTot = this.twentyone.checkTotal(this.game.dealerCards);

    this.disabled = true;

    await new Promise((resolve) => setTimeout(resolve, 400));
    // show dealers hidden card
    this.flip = false;
    this.playSound('card-sound');

    if (
      ((splitTot !== 0 && splitTot < 22) && (this.game.splitCards.length !== 7)) ||
      ((playerTot < 22) && (this.game.userCards.length !== 7))
    ) {
      if (
        ((!(splitTot === 21 && this.game.splitCards.length === 2)) && this.game.splitCards.length !== 0) ||
        (!(playerTot === 21 && this.game.userCards.length === 2))
      ) {
        while (dealerTot < 17 && this.game.dealerCards.length < 7) {
          await this.getCard(this.game.dealerCards, 400);
          dealerTot = this.twentyone.checkTotal(this.game.dealerCards);
        }
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (splitTot !== 0 && splitTot < 22) {
      await this.checkWinning(this.game.splitCards.length, splitTot, dealerTot, 'splitResult');
    }

    await this.checkWinning(this.game.userCards.length, playerTot, dealerTot, 'result');

    if (this.game.insured && this.game.dealerCards.length === 2 && this.twentyone.checkTotal(this.game.dealerCards) === 21) {
      this.game.bank += this.game.bet * 1.5;
      this.game.bank += this.game.splitBet * 1.5;
    }


    this.game.state = 'bet';
    this.disabled = false;
    this.twentyone.saveGame(this.game);
  }

  reset() {
    this.game = new TwentyoneGame(_.pick(this.game, ['deck', 'result', 'icon', 'splitResult', 'splitIcon']));
  }

  async checkWinning(length, playerTot, dealerTot, hand) {                         // Check to see who won
    let odds = 1;
    let icon: string;
    let result: Result;
    let message = '';
    let newBank: number = this.game.bank;

    if ((length === 7) && (playerTot < 22)) {                                  // Win on 7 cards
      result = 'win';
      message = 'Win with 7 cards!';
      newBank = this.game.bank + (this.game.bet * 2);
    } else if (playerTot > 21) {                                               // Busted
      result = 'lose';
      message = 'Busted with ' + playerTot;
    } else if (length === 2 && playerTot === 21) {
      if (this.game.dealerCards.length === 2 && dealerTot === 21) {
        if (this.game.splitCards.length === 0) {                               // Blackjack tie
          newBank = this.game.bank + this.game.bet;
          result = 'tie';
          message = 'Push on Blackjack.';
          icon = 'neutral';
        } else {                                                             // Dealer blackjack
          result = 'lose';
          message = 'Dealer Blackjack.';
          icon = 'very-sad';
        }
      } else {
        if (this.game.splitCards.length === 0) {                             // Player wins with blackjack
          newBank = this.game.bank + (this.game.bet * 2.5);
          result = 'win';
          message = 'BLACKJACK!';
          icon = 'very-happy';
          odds = 1.5;
          this.window.loadComponent(BlackjackComponent);
        } else {                                                             // Player wins with 21 but not blackjack
          newBank = this.game.bank + (this.game.bet * 2);
          result = 'win';
          message = 'WIN! with 21';
          icon = 'happy';
        }
      }
    } else if (this.game.dealerCards.length === 2 && dealerTot === 21) {     // Dealer wins with blackjack
      result = 'lose';
      message = 'Dealer Blackjack.';
      icon = 'very-sad';
    } else if (dealerTot > 21) {                                             // Dealer busts
      newBank = this.game.bank + (this.game.bet * 2);
      result = 'win';
      message = 'Dealer Busts. WIN!';
      icon = 'happy';
    } else if (playerTot > dealerTot) {                                      // Player wins
      newBank = this.game.bank + (this.game.bet * 2);
      result = 'win';
      message = 'WIN! ' + playerTot + ' to ' + dealerTot;
      icon = 'happy';
    } else if (playerTot === dealerTot) {                                    // It's a tie
      newBank = this.game.bank + this.game.bet;
      result = 'tie';
      message = 'Push ' + playerTot + ' to ' + dealerTot;
      icon = 'neutral';
    } else {                                                                 // Dealer wins
      result = 'lose';
      message = 'Lose ' + playerTot + ' to ' + dealerTot;
      icon = 'sad';
    }

    await this.endHand(result, message, icon, hand, newBank);
    this.twentyone.stats = { game: this.game, result, odds };
  }

  async endHand(
    snd: Result,
    msg: string,
    icon: string,
    hand: 'result' | 'splitResult',
    newBank: number
  ) {
    this.disabled = true;
    this.playSound(snd);
    await new Promise((resolve) => setTimeout(resolve, 400));

    this.game[hand] = msg;
    this.game[hand === 'result' ? 'icon' : 'splitIcon'] = icon;
    this.game.bank = newBank;

    if (this.game.bank < 10) {
      this.reset();
      this.twentyone.stats = { game: this.game, result: 'bank-reset' };
    }

    this.disabled = false;
  }

  playSound(snd: Result) {
    this.cardSound = this.soundService.playSound(snd);
  }

  doEvent(action: string) {
    switch (action) {
      case 'stats':
        this.window.loadComponent(StatsComponent);
        break;
      default:
        break;
    }
  }

  about() {
    this.router.navigate(['about']);
  }

  trackByFn = (index: number) => index;

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.twentyone.animate = false;
  }
}