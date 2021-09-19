import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  games = [
    {
      name: 'Twenty One',
      description: 'Classic twenty one game.',
      link: 'twenty-one',
      icon: 'twenty-one-icon.png'
    },
    {
      name: 'Solitaire',
      description: 'Classic Klondike Solitaire.',
      link: 'solitaire',
      icon: 'solitaire-icon.png'
    },
    {
      name: 'FreeCell',
      description: 'FreeCell solitaire.',
      link: 'free-cell',
      icon: 'solitaire-icon.png'
    }

  ];

  constructor() { }

  ngOnInit(): void {
  }

  trackByFn = (index: number, card) => card.name;
}
