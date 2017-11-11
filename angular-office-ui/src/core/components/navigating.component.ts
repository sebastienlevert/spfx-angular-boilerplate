import { Inject, NgZone } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

export abstract class BaseNavigatingComponent {
  constructor(protected zone: NgZone, protected router: Router) {
  }

  protected navigate(commands: any[], extras?: NavigationExtras) {
    this.zone.run(() => {
      this.router.navigate(commands, extras);
    });
  }
}
