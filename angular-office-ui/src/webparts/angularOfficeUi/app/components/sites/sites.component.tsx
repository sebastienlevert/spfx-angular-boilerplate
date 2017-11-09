import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Component, OnInit, ElementRef, Inject, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { ConfigurationService } from "./../../shared/services";
import { BaseNavigatingComponent } from './../../../../../core/components/navigating.component';

@Component({
  selector: "sites",
  template: '<div #commandBar></div><router-outlet></router-outlet>'
})
export class SitesComponent extends BaseNavigatingComponent implements OnInit {
  @ViewChild('commandBar') private commandBarElement: ElementRef;

  private menuItems: IContextualMenuItem[] = [
    {
      key: 'homeSite',
      name: 'Home',
      icon: 'Home',
      onClick: () => { this.navigate(['/'], { skipLocationChange: true }); }
    },
    {
      key: 'newItem',
      name: 'New Site',
      icon: 'Add',
      disabled: !this.configurationService.isConfigured(),
      onClick: () => { this.navigate(['/sites/new'], { skipLocationChange: true }); }
    }
  ];

  constructor(@Inject(NgZone) protected zone: NgZone, @Inject(Router) protected router: Router, @Inject(ConfigurationService) private configurationService: ConfigurationService) {
    super(zone, router);
  }

  public ngOnInit() {
    ReactDOM.render(<CommandBar items={ this.menuItems } />, this.commandBarElement.nativeElement);
  }
}
