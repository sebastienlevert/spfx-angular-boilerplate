import { Component } from '@angular/core';

export class AppComponent {
  public static getComponent(selectorId: string): any {
    return Component({
      selector: `angular-${selectorId}`,
      template: `<router-outlet></router-outlet>`
    })(class AppComponentInner {});
  }
}