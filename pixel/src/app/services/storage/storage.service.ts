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
          id: 0,
          cntID: 100,
          cntMoney: 0,
          avatarNr: 0,
          value: 0,
          priority: 3
        },
        {
          id: 12,
          title: "Fox2",
          value: 10,
          modified: true,
        },
        {
          id: 13,
          title: "Fox3",
          value: 20,
          modified: true,
        },
        {
          id: 14,
          title: "Fox4",
          value: 30,
          modified: true,
        },
        {
          id: 15,
          title: "Fox5",
          value: 30,
          modified: true,
        },
        {
          id: 30,
          title: "DonutChart",
          value: 5,
          modified: true,
        },
        {
          id: 31,
          title: "BarChart",
          value: 5,
          modified: true,
        },
        {
          id: 60,
          title: "Horst Leerhofer",
          value: 5,
          modified: true,
        },
        {
          id: 61,
          title: "Vladimir Luping",
          value: 15,
          modified: true,
        },
        {
          id: 62,
          title: "Barack Ohlama",
          value: 25,
          modified: true,
        },
        {
          id: 63,
          title: "Kim Jong Lol",
          value: 5,
          modified: true,
        },
        {
          id: 64,
          title: "Donald Lump",
          value: 20,
          modified: true,
        },
        {
          id: 65,
          title: "Angela Mörtel",
          value: 25,
          modified: true,
        },
        {
          id: 66,
          title: "Junger Padawan",
          value: 20,
          modified: true,
        },
        {
          id: 80,
          title: "Klicke mich",
          value: null,
          modified: false,
          createdAt: "11.9.2020",
          finishedAt: null,
          msgFin: "Toller erster Job",
          priority: null,
        },
        {
          id: 81,
          title: "Wische mich nach links",
          value: null,
          modified: false,
          createdAt: "10.9.2020",
          finishedAt: null,
          msgFin: "Super jetzt kannst du löschen",
          priority: null,
        },
        {
          id: 82,
          title: "Finde die Statistiken",
          value: null,
          modified: false,
          createdAt: "13.9.2020",
          msgFin: "Deine Statistik ist schon toll",
          finishedAt: null,
          priority: null,
        },
        {
          id: 83,
          title: "Finde das Spielerranking",
          value: null,
          modified: false,
          createdAt: "09.9.2020",
          msgFin: "Besiege deine Gegner!",
          finishedAt: null,
          priority: null,
        },
        {
          id: 84,
          title: "Ändere den Schwierigkeitsgrad",
          value: null,
          modified: false,
          createdAt: "09.9.2020",
          msgFin: "Besiege deine Gegner!",
          finishedAt: null,
          priority: null,
        },
        {
          id: 85,
          title: "Ändere dein Avatar",
          value: null,
          modified: false,
          createdAt: "07.9.2020",
          msgFin: "Hübsch siehst du aus :)",
          finishedAt: null,
          priority: null,
        },
        {
          id: 86,
          title: "Gib deine Mäuse aus",
          value: null,
          modified: false,
          createdAt: "27.9.2020",
          msgFin: "Money money!!!",
          finishedAt: null,
          priority: null,
        },
        {
          id: 87,
          title: "Platzhalter",
          value: null,
          modified: false,
          createdAt: "27.9.2020",
          finishedAt: "27.9.2020",
          priority: null,
        },
        {
          id: 88,
          title: "Platzhalter",
          value: null,
          modified: false,
          createdAt: "22.9.2020",
          finishedAt: "24.9.2020",
          priority: null,
        },
        {
          id: 89,
          title: "Platzhalter",
          value: null,
          modified: false,
          createdAt: "22.9.2020",
          finishedAt: "29.9.2020",
          priority: null,
        },
        {
          id: 90,
          title: "Platzhalter",
          value: null,
          modified: false,
          createdAt: "22.9.2020",
          finishedAt: "27.9.2020",
          priority: null,
        }
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

  async getMoney() {
    var storageData = await this.storage.get(ITEMS_KEY);
    return storageData[0].cntMoney;
  }

  async setMoney(typeoperator: string, value: any) {
    var storageData = await this.storage.get(ITEMS_KEY);

    if (typeoperator === "incMoney")
      storageData[0].cntMoney++;
    else if (typeoperator === "subMoney")
      storageData[0].cntMoney -= value;

    return this.storage.set(ITEMS_KEY, storageData);
  }

  async getMsg(inputItem: Item) {
    var storageData = await this.storage.get(ITEMS_KEY);
    
    //find index of ID
    var tempStorage = storageData;
    const isID = (element) => element.id === inputItem.id;
    var index = tempStorage.findIndex(isID);
    
    return tempStorage[index].msgFin;
  }

  async getFoxNr() {
    var storageData = await this.storage.get(ITEMS_KEY);
    return storageData[0].avatarNr;
  }

  async setFoxStatus(nr) {
    let FoxNr = 10+nr;
    var storageData = await this.storage.get(ITEMS_KEY);
    
    //find index of ID
    var tempStorage = storageData;
    const isID = (element) => element.id === FoxNr;
    var index = tempStorage.findIndex(isID);
    tempStorage[index].modified = false;
    return this.storage.set(ITEMS_KEY, storageData);
  }


  async getFoxStatus(nr) {
    let FoxNr = 10+nr;
    var storageData = await this.storage.get(ITEMS_KEY);
    
    //find index of ID
    var tempStorage = storageData;
    const isID = (element) => element.id === FoxNr;
    var index = tempStorage.findIndex(isID);
    return tempStorage[index].modified;
  }

  async setFoxNr(foxNr) {
    var storageData = await this.storage.get(ITEMS_KEY);

    storageData[0].avatarNr = foxNr;

    return this.storage.set(ITEMS_KEY, storageData);
  }

  async setExpectationTasks(cntTotalItems) {
    var storageData = await this.storage.get(ITEMS_KEY);

    storageData[0].value = cntTotalItems;

    return this.storage.set(ITEMS_KEY, storageData);
  }

  async getExpecationTasks() {
    var storageData = await this.storage.get(ITEMS_KEY);
    return storageData[0].value;
  }

  async setExpecationDifficulty(cntTotalItems) {
    var storageData = await this.storage.get(ITEMS_KEY);

    storageData[0].priority = cntTotalItems;

    return this.storage.set(ITEMS_KEY, storageData);
  }

  async getExpecationDifficulty() {
    var storageData = await this.storage.get(ITEMS_KEY);
    return storageData[0].priority;
  }

  async setChartVisible(nr) {
    let FoxNr = 30+nr;
    var storageData = await this.storage.get(ITEMS_KEY);
    
    //find index of ID
    var tempStorage = storageData;
    const isID = (element) => element.id === FoxNr;
    var index = tempStorage.findIndex(isID);
    tempStorage[index].modified = false;
    return this.storage.set(ITEMS_KEY, storageData);
  }

  async getChartVisible(nr) {
    let FoxNr = 30+nr;
    var storageData = await this.storage.get(ITEMS_KEY);
    
    //find index of ID
    var tempStorage = storageData;
    const isID = (element) => element.id === FoxNr;
    var index = tempStorage.findIndex(isID);
    return tempStorage[index].modified;
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
