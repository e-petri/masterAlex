import { TodoListComponent } from "./../../components/todo-list/todo-list.component";
import { ItemDetailPage } from "./../../item-detail/item-detail.page";
import { StorageService } from "./../../services/storage/storage.service";
import { IonicStorageModule } from "@ionic/storage";
import { AvatarService } from "../../services/avatar/avatar.service";
import { Item } from "../../interfaces/Item";
import { Component, ElementRef } from "@angular/core";
import { AddItemPage } from "src/app/add-item/add-item.page";
import {
  NavController,
  AlertController,
  Platform,
  ToastController,
  ModalController,
} from "@ionic/angular";

// import { ItemDetailPage } from '../item-detail/item-detail';
import { ViewChild } from "@angular/core";
import { Storage } from "@ionic/storage";
// import { storage } from 'firebase';
// import { timeStamp } from "console";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  items: Item[] = [];
  newItem: Item = <Item>{};
  item: string;
  today = new Date();
  itemsToDo: Item[];
  avatarInfo;
  // @ViewChild("checkboxElement", {static: false, read: ElementRef}) checkboxElement: ElementRef;
  @ViewChild("myList") myList;
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public storageService: StorageService,
    private plt: Platform,
    private toastController: ToastController,
    public modalController: ModalController,
    public avatarService: AvatarService
  ) {
    this.plt.ready().then(() => {
      this.loadItems();
    });
    this.getAvatarInfo();
    console.log("date today", this.today.toLocaleDateString());
  }
  ionViewDidLoad() {
    setTimeout(() => {
      // this.myList.setFocus();
    }, 350);
  }
  async presentAlert(item: []) {
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      header: "Glückwunsch!",

      // subHeader: 'Subtitle',
      message: "Dies ist dein erster erledigter Task! Weiter so :)",

      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Ok",
          handler: () => {
            // this.deleteListItem(item);
          },
        },
      ],
    });

    await alert.present();
  }

  itemChecked($event: CustomEvent, title: []) {
    this.presentAlert(title);
    this.deleteListItem(title);
    this.loadItems();
    console.log("checked item", title);
  }
  async getAvatarInfo(): Promise<any> {
    this.avatarInfo = await this.avatarService.getAvatar();
    console.log("avatar.info", this.avatarInfo);
  }
  async addItem(input: string) {
    console.log("addItem() is called");
    if (input === "" || input === undefined) {
      console.log("input is empty");
      this.storageService.initializeStorage();
      const test = await this.storageService.getItems();
      console.log("test if data is added", test);
      return;
    }
    // this.storage.set("tasks", "newItem");
    // this.newItem.modified = Date.now();
    this.newItem.id = Date.now();

    this.storageService.addItem(this.newItem).then((item) => {
      this.newItem = <Item>{};
      this.showToast("Item added!");
      this.loadItems();
    });
  }

  // updateItem(item: Item) {
  //   // item.title = "UPDATED: ${item.title}";
  //   item.title = JSON.parse(item.title);
  //   item.modified = Date.now();

  //   this.storageService.updateItem(item).then((item) => {
  //     this.showToast("Item updated!");
  //     this.myList.closeSlidingItems();
  //     this.loadItems();
  //   });
  // }
  loadItems() {
    this.storageService.getItems().then((items) => {
      this.items = items;
      console.log("All items", this.items);

      this.itemsToDo = this.items.filter((item) => item.finishedAt !== null);
      console.log("this.itemsToDo", this.itemsToDo);
    });
    return this.itemsToDo;
  }
  async deleteListItem(item) {
    const storageItems = this.storageService.getItems();
    const test = (await storageItems).filter(
      (items) => items.title === "Test1"
    );
    console.log("test", test);
    item.finishedAt = this.today.toLocaleDateString();

    // this.storageService.deleteItem(item);

    await this.storageService.getItems().then((items: Item[]) => {
      for (let i of items) {
        if (i.title === item.title) {
        }
        console.log("found item title", i.title, item.title);
      }
    });
    console.log("item", item, item.finishedAt);
    // this.itemsToDo = this.items.filter((item) => item.finishedAt !== null);
    // console.log("this.itemsToDo", this.itemsToDo);
    // const storageData = await this.storageService.getItems();
    // //     const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

    // //     const result = words.filter(word => word.length > 6);
    // const newStorageData = storageData.filter(
    //   (items) => item.value !== items.value
    // );
    // this.storageService.newArray(newStorageData);
    // return this.itemsToDo;
  }
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ItemDetailPage,
      cssClass: "my-custom-class",
      componentProps: {
        firstName: "Douglas",
        // TODO: hier item objekt übergeben
      },
    });
    return await modal.present();
  }
  navToPage(pageName: string) {
    if (pageName === "statistic") {
      this.navCtrl.navigateForward("/statistic");
    } else if (pageName === "home") {
      this.navCtrl.navigateForward("/home");
    }
  }

  // async deleteAllItems(item) {
  //   // item.title = "UPDATED: ${item.title}";
  //   // item.title = JSON.parse(item.title);
  //   item.modified = Date.now();

  //   await this.storageService.deleteItem(item).then((item) => {
  //     this.showToast("Item updated!");
  //     this.myList.closeSlidingItems();
  //     this.loadItems();
  //   });
  // }
}
