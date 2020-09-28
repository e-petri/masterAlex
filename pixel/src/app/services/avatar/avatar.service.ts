import { Item } from "../../interfaces/Item";
import { Injectable } from "@angular/core";
import { StorageService } from "../storage/storage.service";
import { Fox } from "src/app/interfaces/fox";
import { Storage } from "@ionic/storage";

const ITEMS_KEY = "avatar";

@Injectable({
  providedIn: "root",
})
export class AvatarService {
  initAvatar: Fox = {
    name: "Fox",
    bag: [],
    gold: 1,
    backstory: "",
    tasksDone: 0,
    tasksOpen: 0,
  };

  constructor(private storage: Storage) {}

  async getAvatar(): Promise<Item[]> {
    console.log("avatar is called");
    if (
      (await this.storage.get(ITEMS_KEY)) === null ||
      (await this.storage.get(ITEMS_KEY)) === undefined
    ) {
      console.log("Avatar: ", this.storage.get(ITEMS_KEY));
      return await this.storage.set(ITEMS_KEY, this.initAvatar);
    } else {
      //console.log("this.storage.get(ITEMS_KEY)", await this.storage.get(ITEMS_KEY));
      return await this.storage.get(ITEMS_KEY);
    }
  }
  // async addItem(item: Item): Promise<Item[]> {
  //   const storageData = await this.storage.get(ITEMS_KEY);
  //   console.log("storageData", storageData);
  //   if (this.items) {
  //     // console.log("items: ", this.items, " item", item);
  //     storageData.push(item);
  //     // let a = this.storage.get(ITEMS_KEY);
  //     return this.storage.set(ITEMS_KEY, storageData);
  //     // a = this.storage.get(ITEMS_KEY);
  //   } else {
  //     // console.log("else");
  //     return this.storage.set(ITEMS_KEY, [item]);
  //   }
  // }

  // updateItem(item: Item): Promise<any> {
  //   return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
  //     if (!items || items.length === 0) {
  //       return null;
  //     }
  //     let newItems: Item[] = [];

  //     for (let i of items) {
  //       if (i.id === item.id) {
  //         console.log("push called");
  //         newItems.push(item);
  //       } else {
  //         newItems.push(item);
  //       }
  //     }
  //     return this.storage.set(ITEMS_KEY, newItems);
  //   });
  // }
}
