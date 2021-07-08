import { Component, ComponentFactoryResolver, HostListener, OnDestroy, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { Howl } from 'howler';
import { Game } from '../models/game';
import { TwentyOneService } from '../services/twenty-one.service';
import { BlackjackComponent } from './blackjack/blackjack.component';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SettingsComponent } from './settings/settings.component';
import { Settings } from '../models/settings';
// tslint:disable-next-line:no-string-literal
const hasLocalStorage = 'localStorage' in window && window['localStorage'] !== null;

@Component({
  selector: 'app-twenty-one',
  templateUrl: './twenty-one.component.html',
  styleUrls: ['./twenty-one.component.scss']
})
export class TwentyOneComponent implements OnInit, OnDestroy {
  controls = [];
  betControls = [
    { class: 'chip10', action: 'bet', value: 10, states: ['bet', 'deal'] },
    { class: 'chip50', action: 'bet', value: 50, states: ['bet', 'deal'] },
    { class: 'chip100', action: 'bet', value: 100, states: ['bet', 'deal'] },
    { class: 'chip500', action: 'bet', value: 500, states: ['bet', 'deal'] },
    { class: 'deal-cards', action: 'deal', label: 'Deal', states: ['deal'] },
    { class: 'deal-cards', action: 'hit', value: 'userCards', label: 'Hit', states: ['hit'] },
    { class: 'deal-cards', action: 'stand', value: 'userCards', label: 'Stand', states: ['hit'] },
    { class: 'deal-cards', action: 'double', value: 'userCards', label: 'Double', states: ['hit'], condition: 'canDouble' },
    { class: 'deal-cards', action: 'hit', value: 'splitCards', label: 'Hit', states: ['hit-on-split'] },
    { class: 'deal-cards', action: 'stand', value: 'splitCards', label: 'Stand', states: ['hit-on-split'] },
    { class: 'deal-cards', action: 'double', value: 'splitCards', label: 'Double', states: ['hit-on-split'], condition: 'canDoubleSplit' },
    { class: 'deal-cards', action: 'split', label: 'Split', states: ['hit', 'hit-on-split'], condition: 'canSplit' },
    { class: 'surrender', action: 'surrender', label: 'Surrender', states: ['hit', 'hit-on-split'], condition: 'canSurrender' },
    { class: 'a-button', states: ['bet'] }
  ];
  dealControl = { class: 'deal-cards', action: 'deal', label: 'Deal' };
  game = new Game();
  placeholders = Array.apply(null, Array(7));
  disabled = false;
  cardSound = false;
  animate = false;
  flip = true;
  height = 100;
  settings = new Settings();
  destroyed$ = new Subject();

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private renderer: Renderer2,
    private twentyone: TwentyOneService,
  ) {
    this.subscribeToGame();
    this.subscribeToSettings();
    this.setHeight();
    // init saved game state
    const gameState = localStorage.gameState;
    if (gameState) {
      this.game = JSON.parse(atob(gameState));
    } else {
      this.twentyone.shuffleCards(this.game);
    }

    setTimeout(() => this.animate = true, 0);

    this.twentyone.component$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((component: any) => {
        const factory = this.componentFactoryResolver.resolveComponentFactory(component);
        const geebee = this.viewContainerRef.createComponent(factory);

        this.renderer.appendChild(document.body, geebee.location.nativeElement);
      });
  }

  ngOnInit(): void {
    this.controls = this.betControls;
  }

  @HostListener('window:resize')
  setHeight() {
    const height = window.innerHeight;
    const width = window.innerWidth;

    if (height < width) {
      this.height = Math.min((height / 2) - 30, 400);
    } else {
      this.height = (height / 3) - 52;
    }
  }

  subscribeToGame() {
    this.twentyone.game$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(game => this.game = game);
  }

  subscribeToSettings() {
    this.twentyone.settings$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((settings: Settings) => {
        this.settings = settings;

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
      this.game = new Game(_.pick(this.game, pick));
      this.flip = true;
    }
    if (this.game.bank >= value) {
      this.game.bet += value;
      this.game.bank -= value;
      this.playSound('clink');
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

    const playerTot = this.checkTotal(this.game[hand]);
    if (playerTot > 21) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      if (this.game.state === 'hit-on-split') {
        this.game.state = 'hit';
      } else {
        this.doDealer();
      }
    }
    this.twentyone.saveGame(this.game);
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
    this.animate = false;

    if (!this.game.insured) {
      this.game.canInsure = false;
    }

    this.game.bank -= this.game.bet;
    this.game.splitBet = this.game.bet;
    this.game.splitCards.push(...this.game.userCards.splice(0));
    this.game.split = true;

    await new Promise((resolve) => setTimeout(resolve, 200));
    this.animate = true;
    await new Promise((resolve) => setTimeout(resolve, 200));

    this.game.userCards.push(this.game.splitCards.pop());
    await this.getCard(this.game.splitCards, 400);
    await this.getCard(this.game.userCards, 400);
    this.game.state = 'hit-on-split';
    this.twentyone.saveGame(this.game);
    this.disabled = false;
  }

  insure() {
    if (!this.game.insured) {
      this.playSound('clink');
      this.game.insured = true;
      this.game.bank -= this.game.bet / 2;
      this.twentyone.saveGame(this.game);
    }
  }

  async surrender() {
    const dealerTot = this.checkTotal('dealerCards');
    let snd: 'clink' | 'win' | 'lose' | 'blackjack';
    let msg: string;
    let icon: string;
    let newBank: number;
    this.disabled = true;

    await new Promise((resolve) => setTimeout(resolve, 400));

    this.flip = false;
    this.playSound('cardSound');

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
    setTimeout(() => {
      this.endHand(snd, msg, icon, 'result', newBank);
    }, 400);
    this.game.state = 'bet';
    this.twentyone.saveGame(this.game);
    this.disabled = false;
  }

  stand(hand: string) {
    if (!this.game.insured) {
      this.game.canInsure = false;
    }

    if (this.game.state === 'hit-on-split') {
      this.game.state = 'hit';
      this.twentyone.saveGame(this.game);
    } else {
      // document.getElementById("pt").style.color = "white";
      this.doDealer();
    }
  }


  async getCard(hand, t) {
    if (this.game.deck.length === 0) {
      this.twentyone.shuffleCards(this.game);
    }
    const card = this.game.deck.pop();
    await new Promise((resolve) => setTimeout(resolve, t));
    hand.push(card);
  }

  checkTotal(hand) {                              // Check the value of a hand
    let total = 0;
    for (const card of hand) {
      if (Math.floor(card / 4) > 10) {            // Cards over 10 worth 10
        total += 10;
      }
      else if (Math.floor(card / 4) === 1) {      // Aces are worth 11
        total += 11;
      } else {
        total += Math.floor(card / 4);
      }
    }

    let i = 0;
    while (total > 21 && i < hand.length) {       // Subtract 10 for every ace
      if (Math.floor(hand[i] / 4) === 1) {        // just until under 22
        total -= 10;
      }
      i++;
    }
    return total;
  }

  async doDealer(doubled = false) {
    const suit = this.game.dealerCards[1] % 4;
    const value = Math.floor(this.game.dealerCards[1] / 4);
    const playerTot = this.checkTotal(this.game.userCards);
    const splitTot = this.checkTotal(this.game.splitCards);
    let dealerTot = this.checkTotal(this.game.dealerCards);

    this.disabled = true;

    await new Promise((resolve) => setTimeout(resolve, 400));
    // show dealers hidden card
    this.flip = false;
    this.playSound('cardSound');

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
          dealerTot = this.checkTotal(this.game.dealerCards);
        }
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 400));

    await this.checkWinning(this.game.userCards.length, playerTot, dealerTot, 'result');

    if (this.game.insured && this.game.dealerCards.length === 2 && this.checkTotal(this.game.dealerCards) === 21) {
      this.game.bank += this.game.bet * 1.5;
      this.game.bank += this.game.splitBet * 1.5;
    }

    if (splitTot !== 0 && splitTot < 22) {
      await this.checkWinning(this.game.splitCards.length, splitTot, dealerTot, 'splitResult');
    }

    this.game.state = 'bet';
    this.disabled = false;
    this.twentyone.saveGame(this.game);
  }

  reset() {
    this.game = new Game({ deck: this.game.deck });
  }

  async checkWinning(length, playerTot, dealerTot, hand) {                         // Check to see who won
    let odds = 1;
    let icon: string;
    let result: 'clink' | 'win' | 'lose' | 'blackjack';
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
          result = 'clink';
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
          this.twentyone.loadComponent(BlackjackComponent);
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
      result = 'clink';
      message = 'Push ' + playerTot + ' to ' + dealerTot;
      icon = 'neutral';
    } else {                                                                 // Dealer wins
      result = 'lose';
      message = 'Lose ' + playerTot + ' to ' + dealerTot;
      icon = 'sad';
    }

    await this.endHand(result, message, icon, hand, newBank);
    // setStats(result, (bet * odds));
  }

  async endHand(
    snd: 'clink' | 'win' | 'lose' | 'blackjack',
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
    }

    this.disabled = false;
  }

  playSound(snd: 'cardSound' | 'clink' | 'win' | 'lose' | 'blackjack') {
    if (this.settings.sounds !== 'off') {
      this.cardSound = true;
      const sound = new Howl({
        src: ['/assets/snd/blackjack.mp3'],
        sprite: {
          cardSound: [0, 800],
          clink: [1000, 800],
          win: [2000, 2800],
          lose: [5000, 2800],
          blackjack: [8500, 12000]
        }
      });

      sound.play(snd);
    } else {
      this.cardSound = false;
    }
  }

  openSettings() {
    this.twentyone.loadComponent(SettingsComponent);
  }

  openStats() {

  }

  trackByFn = (index: number) => index;

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
