import { ItemModel } from "./../../models";

export interface IItemsService {
  getItems(listName: string): Promise<ItemModel[]>;
}