import { trigger, transition, style, query, animate, group } from '@angular/animations';

const fadeIn = [
  style({ position: 'relative' }),
  query(':leave', style({ position: 'absolute', height: '100%', left: 0, right: 0, opacity: 1 }), { optional: true }),
  query(':enter', style({ position: 'absolute', height: '100%', left: 0, right: 0, opacity: 0 }), { optional: true }),
  group([
    query(':leave', animate('300ms', style({ opacity: 0 })), { optional: true }),
    query(':enter', animate('300ms', style({ opacity: 1 })), { optional: true })
  ])
];

const slideLeft = [
  style({ position: 'relative' }),
  query(':leave', style({ position: 'absolute', height: '100%', left: 0, right: 0, transform: 'translateX(0)' }), { optional: true }),
  query(':enter', style({ position: 'absolute', height: '100%', left: 0, right: 0, transform: 'translateX(100%)' }), { optional: true }),
  group([
    query(':leave', animate('300ms ease-in-out', style({ transform: 'translateX(-100%)' })), { optional: true }),
    query(':enter', animate('300ms ease-in-out', style({ transform: 'translateX(0)' })), { optional: true }),
  ])
];

const slideRight = [
  style({ position: 'relative' }),
  query(':leave', style({ position: 'absolute', height: '100%', left: 0, right: 0, transform: 'translateX(0)' }), { optional: true }),
  query(':enter', style({ position: 'absolute', height: '100%', left: 0, right: 0, transform: 'translateX(-100%)' }), { optional: true }),
  group([
    query(':leave', animate('300ms ease-in-out', style({ transform: 'translateX(100%)' })), { optional: true }),
    query(':enter', animate('300ms ease-in-out', style({ transform: 'translateX(0)' })), { optional: true }),
  ])
];

const slideUp = [
  style({ position: 'relative' }),
  query(':leave', style({ position: 'absolute', height: '100%', left: 0, right: 0, transform: 'translateY(0)' }), { optional: true }),
  query(':enter', style({ position: 'absolute', height: '100%', left: 0, right: 0, transform: 'translateY(100%)' }), { optional: true }),
  group([
    query(':leave', animate('300ms ease-in', style({ transform: 'translateY(-100%)' })), { optional: true }),
    query(':enter', animate('300ms ease-in-out', style({ transform: 'translateY(0)' })), { optional: true }),
  ])
];

const slideDown = [
  style({ position: 'relative' }),
  query(':leave', style({ position: 'absolute', height: '100%', left: 0, right: 0, transform: 'translateY(0)' }), { optional: true }),
  query(':enter', style({ position: 'absolute', height: '100%', left: 0, right: 0, transform: 'translateY(-100%)' }), { optional: true }),
  group([
    query(':leave', animate('300ms ease-in-out', style({ transform: 'translateY(100%)' })), { optional: true }),
    query(':enter', animate('300ms ease-in-out', style({ transform: 'translateY(0)' })), { optional: true }),
  ])
];

export const fadeAnimation =
  trigger('routerAnimation', [
    transition('* <=> *', fadeIn)
  ]);

export const slideAnimation =
  trigger('routerAnimation', [
    transition('twentyone => solitaire', slideRight),
    transition('twentyone => free-cell', slideRight),
    transition('solitaire => free-cell', slideRight),
    transition('solitaire => twentyone', slideLeft),
    transition('free-cell => twentyone', slideLeft),
    transition('free-cell => solitaire', slideLeft),
    transition('* => fourofour', slideUp),
    transition('fourofour => *', slideDown),
    transition('* => *', fadeIn),
  ]);
