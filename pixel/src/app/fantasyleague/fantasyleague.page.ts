import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Item } from "../interfaces/Item";
import { AddItemPage } from "src/app/add-item/add-item.page";
import { StorageService } from '../services/storage/storage.service';

const NUM_DAYS = 8;

@Component({
  selector: 'app-fantasyleague',
  templateUrl: './fantasyleague.page.html',
  styleUrls: ['./fantasyleague.page.scss'],
})
export class FantasyleaguePage implements OnInit {
  items: Item[] = [];
  item: string;
  itemsTemp: Item[];
  itemsToDo: Item[];
  money = 0;
  aimTasks = null;
  currentAvatar = " ";
  difficulty = " ";
  constructor(
    public navCtrl: NavController,
    private plt: Platform,
    public storageService: StorageService,
  ) { 
    this.plt.ready().then(() => {
      this.loadItems();
    });
  }

  async setDatasetEnemy() {
    let tempDif = await this.storageService.getExpecationDifficulty();
    if (tempDif === 6)
      this.difficulty = "leicht";
    else if (tempDif === 3)
      this.difficulty = "mittel";
    else if (tempDif === 1)
      this.difficulty = "schwer";

    let createdTasks = await this.storageService.getExpecationTasks();
    this.aimTasks = Math.floor(createdTasks/tempDif);
  }

  async ngOnInit() {
    this.money = await this.storageService.getMoney();
    this.myCurrentAvatar();
    await this.setDatasetEnemy();
    await this.storageService.setEnemyValues(this.aimTasks);
    this.loadItems();
  }

  setDif (value: number) {
    this.storageService.setExpecationDifficulty(value);
    this.ngOnInit();
  }

  async myCurrentAvatar () {
    this.currentAvatar = await this.storageService.getCurrentAvatar();
  }

  async loadItems() {
    const alert  = await this.storageService.getItems();
    this.storageService.getItems().then((items) => {
      this.items = items;
      console.log("All items", this.items);

      this.itemsTemp = this.items.filter((item) => item.id >= 60 && item.id < 80);

      /******** magic js sortierfunktion *****/
      function compare(a, b) {
  
        let comparison = 0;
        if (a.value > b.value) {
          comparison = -1;
        } else if (a.value < b.value) {
          comparison = 1;
        }
        return comparison;
      }
    
      this.itemsTemp.sort(compare);
      /********ende magic js sortierfunktion *****/

      this.itemsToDo = this.itemsTemp;
      console.log("this.itemsToDo", this.itemsToDo);
    });
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
    }
  }

}
