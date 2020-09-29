import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { isFunction } from "util";
import { Item } from "src/app/interfaces/Item";

const ITEMS_KEY = "storageSpace";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  items = [];
  constructor(private storage: Storage) {
    this.initializeStorage();
  }
  // var firebase = require("firebase");
  async initializeStorage() {
    var storageData = await this.storage.get(ITEMS_KEY);
    if (storageData === null) {
      console.log("storage data is null:", storageData);
      //   // dummy data
      this.items = [
        {
          id: "00",
          cntID: 100,
        },
        {
          id: "01",
          title: "Aufgabe 01",
          value: "Aufgabe value 01",
          modified: 1,
          createdAt: "11.9.2020",
          finishedAt: null,
          priority: null,
        },
        {
          id: "02",
          title: "Aufgabe 02",
          value: "Aufgabe value 02",
          modified: 1,
          createdAt: "10.9.2020",
          finishedAt: null,
          priority: null,
        },
        {
          id: "03",
          title: "Aufgabe 03",
          value: "Aufgabe value 03",
          modified: 1,
          createdAt: "13.9.2020",
          finishedAt: "27.9.2020",
          priority: null,
        },
        {
          id: "04",
          title: "Aufgabe 04",
          value: "Aufgabe value 04",
          modified: 1,
          createdAt: "09.9.2020",
          finishedAt: "26.9.2020",
          priority: null,
        },
        {
          id: "05",
          title: "Aufgabe 05",
          value: "Aufgabe value 05",
          modified: 1,
          createdAt: "07.9.2020",
          finishedAt: "24.9.2020",
          priority: null,
        },
      ];
      this.storage.set(ITEMS_KEY, this.items);
      storageData = await this.storage.get(ITEMS_KEY);
      console.log("storage:", storageData);
      return;
    }
    console.log("got data so no initalize neccessary");
    return;
  }
  async addItem(item: Item): Promise<Item[]> {
    var storageData = await this.storage.get(ITEMS_KEY);
    console.log("storageData", storageData);
    
    /****** get last used ID and increase ID  */
    item.id = storageData[0].cntID+1;
    storageData[0].cntID = item.id;

    //const today = new Date();
    //item.createdAt = today.toLocaleDateString();
    //item.title = item.value;
    //item.finishedAt
    console.log("item.createdAt", item.createdAt);
    if (this.items) {
      // console.log("items: ", this.items, " item", item);
      storageData.push(item);
      // let a = this.storage.get(ITEMS_KEY);
      return this.storage.set(ITEMS_KEY, storageData);
      // a = this.storage.get(ITEMS_KEY);
    } else {
      // dummy data

      console.log("no input");
    }
  }

  async getItems(): Promise<Item[]> {
    return await this.storage.get(ITEMS_KEY);
  }

  async updateItem(inputItem: Item, attribute: string, newValue: any): Promise<any> {
    
    const storageItems = await this.getItems();
    console.log("updateItem: ", inputItem, attribute, newValue);
    
    //find index of ID
    var tempStorage = storageItems;
    const isID = (element) => element.id === inputItem.id;
    var index = tempStorage.findIndex(isID);
    
    if(attribute === "finishedAt")
      tempStorage[index].finishedAt = newValue;
    
    //const array1 = [5, 12, 8, 130, 44];
    //const isLargeNumber = (element) => element > 13;
    //console.log(array1.findIndex(isLargeNumber));


    return this.storage.set(ITEMS_KEY, tempStorage);
    /*if(attribute === "finishedAt"){

      const filteredItem = storageItems.filter(items => {
        items.title === inputItem.title
      })
      filteredItem.items. = newValue;


    }*/
    // console.log("inputItem", inputItem.title);
    // const storageItems = await this.getItems();
    // const filter = storageItems.filter(items => {
    //   items.title === inputItem.title
    //   console.log("found same title ", items.title, inputItem.title);
              
            
    // });
    // console.log("filter", filter);
    // let newItems: Item[] = [];
    // let counter = 0;
    // for (let i of storageItems) {
    //   if (i.title === inputItem.title) {
    //     console.log("i", i);

    //     // newItems.push(item);
    //     newItems.push(i);
    //     return;
    //   }

    //   console.log("round#", counter++);
    // }
    //return this.storage.set(ITEMS_KEY, newItems);

    // return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
    //   if (!items || items.length === 0) {
    //     return null;
    //   }
    //   let newItems: Item[] = [];

    //   for (let i of items) {
    //     if (i.title === item.title) {
    //       console.log("push called");
    //       newItems.push(item);
    //     } else {
    //       newItems.push(item);
    //     }
    //   }
    //   return this.storage.set(ITEMS_KEY, newItems);
    // });
  }
  // id: number
  deleteItem(item): Promise<Item> {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (!items || items.length === 0) {
        return null;
      }
      let toKeep: Item[] = [];

      for (let i of items) {
        if (i.title !== item.title) {
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });
  }
  // async generateId(): Promise<any> {
  //   const uniqueId =
  //     Math.random().toString(36).substring(2, 15) +
  //     Math.random().toString(36).substring(2, 15);
  //   return uniqueId;
  // }
  // async initializeStorage(key: string, initialValue: any) {
  //   await this.updateStorage(key, initialValue);

  newArray(newArray) {
    this.storage.set(ITEMS_KEY, newArray);
  }
  // async getStorageValues(): Promise<any> {
  //   return JSON.parse(await this.storage.get(ITEMS_KEY));
  // }

  // async updateStorage(key, value): Promise<void> {
  //   await this.storage.set(key, JSON.stringify(value));
  // }
  // async setStorage(key, value){
  //   await this.storage.set(key, value);
  // }
}
