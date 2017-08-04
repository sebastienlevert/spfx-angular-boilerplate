import { Component, Inject, OnInit } from '@angular/core';
import { ConfigurationService } from "./../shared/services/configuration.service";
import { ItemsService } from "./../shared/services";
import { ItemModel } from "./../shared/models";

@Component({
  selector: "list",
  template: require("./list.template.html") as string
})
export class ListComponent implements OnInit {
  private listName: string = "";
  private items: ItemModel[] = [];

  constructor(@Inject(ConfigurationService) private configurationService: ConfigurationService, @Inject(ItemsService) private itemsService: ItemsService) {
    this.listName = configurationService.listName;
  }
  
  public ngOnInit() {
    this.itemsService.getItems(this.configurationService.listName).then((items: ItemModel[]) => {
      this.items = items;
    });
  }
}