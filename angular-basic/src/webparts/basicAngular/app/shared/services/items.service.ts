import { Injectable } from '@angular/core';
import pnp from "sp-pnp-js";
import { IItemsService } from "./../services/interfaces/items.service";
import { ItemModel } from "./../models";

@Injectable()
export class ItemsService implements IItemsService {
  public async getItems(listName: string): Promise<ItemModel[]> {
    return await pnp.sp.web.lists.getByTitle(listName).items.getAs<ItemModel[]>();
  }
}
