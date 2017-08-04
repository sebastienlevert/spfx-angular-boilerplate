import { Injectable } from '@angular/core';
import { IItemsService } from "./../../services/interfaces/items.service";
import { ItemModel } from "./../../models";

@Injectable()
export class MockItemsService implements IItemsService {
  private readonly MOCK_DELAY: number = 1000;

  constructor() {
  }

  public async getItems(listName: string): Promise<ItemModel[]> {
    return new Promise<ItemModel[]>((resolve, reject) => {
      const items: ItemModel[] = [
        { Id: 1, Title: "Mauris consectetur dapibus lectus non posuere" },
        { Id: 2, Title: "Sed lacinia ligula ut consectetur varius" },
        { Id: 3, Title: "Quisque elementum orci sed feugiat tristique" }
      ];

      setTimeout( () => {
        resolve(items);
      }, this.MOCK_DELAY);
    });
  }
}