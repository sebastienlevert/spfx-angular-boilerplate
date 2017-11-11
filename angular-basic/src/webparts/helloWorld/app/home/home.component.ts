import { Component, Inject } from '@angular/core';
import { ConfigurationService } from "./../shared/services/configuration.service";

@Component({
  selector: "home",
  template: `Hello {{ title }}`
})
export class HomeComponent {
  private title: string = "";
  constructor(@Inject(ConfigurationService) private configurationService: ConfigurationService) {
    this.title = configurationService.description;
  }
}
