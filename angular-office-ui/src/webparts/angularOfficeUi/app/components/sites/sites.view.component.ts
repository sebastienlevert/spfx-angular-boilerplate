import { Component, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: `site`,
  template: require("./templates/sites.view.template.html") as string
})
export class SitesViewComponent {
  @Input("url") public url: string;
  @Input("title") public title: string;
  @Input("description") public description: string;

  private site: any = null;

  constructor(@Inject(ActivatedRoute) private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.site = JSON.parse(params["data"]);
    });
  }
}
