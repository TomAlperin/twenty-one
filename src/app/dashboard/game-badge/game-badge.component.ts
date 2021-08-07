import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-badge',
  templateUrl: './game-badge.component.html',
  styleUrls: ['./game-badge.component.scss']
})
export class GameBadgeComponent implements OnInit {
  @Input() game: {
    name: string,
    description: string,
    link: string,
    icon: string
  };

  constructor() { }

  ngOnInit(): void {
  }
}
