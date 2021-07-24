import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { WindowService } from '@services/window.service';
import { SettingsComponent } from 'src/app/twenty-one/settings/settings.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  options = [
    // {
    //   name: 'Dashboard',
    //   icon: 'home',
    //   url: '/'
    // },
    {
      name: 'Twenty One',
      icon: 'style',
      url: '/'
    },
    {
      name: 'Solitaire',
      icon: 'style',
      url: '/solitaire'
    },
    { divider: true },
    {
      name: 'Settings',
      icon: 'settings',
      action: 'settings'
    },
    {
      name: 'Game Stats',
      icon: 'query_stats',
      action: 'stats'
    }
  ];
  @Input() heading = '';
  @Input() controls: boolean & '';
  @Input() hasStats = false;
  @Output() action = new EventEmitter<string>();


  constructor(
    private router: Router,
    private window: WindowService
  ) { }

  get url(): string {
    return this.router.url;
  }

  doEvent(action: string) {
    switch (action) {
      case 'settings':
        this.window.loadComponent(SettingsComponent);
        break;
        break;
      case undefined:
        break;
      default:
        this.action.emit(action);
        break;
    }
  }

  trackByFn = (index: number) => index;
}
