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
      description: 'Classic twenty one game with splitting, double down, and insurance.',
      link: 'twenty-one',
      icon: 'twenty-one-icon.png'
    },
    {
      name: 'Solitaire',
      description: 'Classic Klondike solitaire with options for single or three card draw.',
      link: 'solitaire',
      icon: 'solitaire-icon.png'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  trackByFn = (index: number, card) => card.name;
}
