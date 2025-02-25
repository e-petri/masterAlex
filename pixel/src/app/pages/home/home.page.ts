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
  money = 0;
  foxPath = null;
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
  }
  ionViewDidLoad() {
    setTimeout(() => {
      // this.myList.setFocus();
    }, 350);
  }
  async presentAlert(item) {
    this.itemsToDo = this.items.filter((item) => item.title === null);
    var mstFin = await this.storageService.getMsg(item);
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      header: "Glückwunsch!",

      // subHeader: 'Subtitle',
      message: mstFin,

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
            this.deleteListItem(item);
          },
        },
      ],
    });

    await alert.present();
  }

  itemChecked($event: CustomEvent, title: []) {
    this.presentAlert(title);
    this.loadItems();
    console.log("checked item", title);
  }

  generateMsg() {
    let aMsg = [
      "MEGA gut",
      "Du schlauer Fuchs",
      "Nice job Bro",
      "Juhu und noch eine Maus",
      "Ausgezeichnet :D",
      "Du bist ja mega fleißig",
      "Weiter, immer weiter geht's",
      "Perfekt",
      "Ran an die Mäuse, nice",
      "Tip top",
      "Und noch eins für die Statistik",
      "Was kaufst du dir von den ganzen Mäusen?",
      "Chillig",
      "Läuft bei dir"
    ]
    let rando = Math.floor(Math.random() * aMsg.length);

    return aMsg[rando];
  }

  async addItem(input: string) {
    const today = new Date();
    console.log("addItem() is called");
    if (input === "" || input === undefined) {
      console.log("input is empty");
      this.storageService.initializeStorage();
      const test = await this.storageService.getItems();
      console.log("test if data is added", test);
      return;
    }
    this.newItem.id = null;
    this.newItem.title = input;
    this.newItem.value = null;
    this.newItem.finishedAt = null;
    this.newItem.msgFin = this.generateMsg();
    this.newItem.priority = null;
    this.newItem.createdAt = today.toLocaleDateString();

    this.storageService.addItem(this.newItem).then((item) => {
      this.newItem = <Item>{};
      this.showToast("Aufgabe hinzugefügt!");
      this.loadItems();
    });
  }

  setFoxPath(foxNr) {
    if(foxNr === 0)
      this.foxPath = "../../../assets/icon/Fox0.png";
    else if(foxNr === 1)
      this.foxPath = "../../../assets/icon/Fox1.png";
    else if(foxNr === 2)
      this.foxPath = "../../../assets/icon/Fox2.png";
    else if(foxNr === 3)
      this.foxPath = "../../../assets/icon/Fox3.png";
    else if(foxNr === 4)
      this.foxPath = "../../../assets/icon/Fox4.png";
    else if(foxNr === 5)
      this.foxPath = "../../../assets/icon/Fox5.png";
    else
      this.foxPath = "../../../assets/icon/Fox0.png";
    return this.itemsToDo;
  }

  async loadItems() {
    const alert  = await this.storageService.getItems();
    this.storageService.getItems().then((items) => {
      this.items = items;
      console.log("All items", this.items);

      this.itemsToDo = this.items.filter((item) => item.finishedAt === null);
      console.log("this.itemsToDo", this.itemsToDo);
    });
    this.money = await this.storageService.getMoney();

    let foxNr = await this.storageService.getFoxNr();
    this.setFoxPath(foxNr);
  }

  async deleteItem(item) {
    await this.storageService.deleteItem(item);
    this.loadItems();
  }

  async deleteListItem(item) {
    const todaysDate = this.today.toLocaleDateString();
    await this.storageService.updateItem(item, "finishedAt", todaysDate);
    this.storageService.setMoney("incMoney", 1);
    this.loadItems();
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
      },
    });
    return await modal.present();
  }
  navToPage(pageName: string) {
    if (pageName === "statistic") {
      this.navCtrl.navigateRoot("/statistic");
    } else if (pageName === "home") {
      this.navCtrl.navigateRoot("/home");
    } else if (pageName === "fantasyleague") {
      this.navCtrl.navigateRoot("/fantasyleague");
    } else if (pageName === "store") {
      this.navCtrl.navigateRoot("/store");
    } else if (pageName === "avatar-setting") {
      this.navCtrl.navigateRoot("/avatar-setting");
    } else if (pageName === "story") {
      this.navCtrl.navigateRoot("/story");
    }
  }
}
