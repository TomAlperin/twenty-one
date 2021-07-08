import { trigger, transition, style, query, animate } from '@angular/animations';

const fadeIn = [
  query(':leave', style({ position: 'absolute', left: 0, right: 0, opacity: 1 }), { optional: true }),
  query(':enter', style({ position: 'absolute', left: 0, right: 0, opacity: 0 }), { optional: true }),
  query(':leave', animate('180ms', style({ opacity: 0 })), { optional: true }),
  query(':enter', animate('180ms', style({ opacity: 1 })), { optional: true })
];

const slideLeft = [
  query(':leave', style({ position: 'absolute', left: 0, right: 0, transform: 'translateX(0)' }), { optional: true }),
  query(':enter', style({ position: 'absolute', left: 0, right: 0, transform: 'translateX(100%)' }), { optional: true }),
  query(':leave', animate('180ms', style({ transform: 'translateX(-100%)' })), { optional: true }),
  query(':enter', animate('180ms', style({ transform: 'translateX(0)' })), { optional: true })
];

export const routeAnimation =
  trigger('routerAnimation', [
    transition('* <=> *', fadeIn)
  ]);

export const slideLeftAnimation =
  trigger('routerAnimation', [
    transition('* <=> *', slideLeft)
  ]);
