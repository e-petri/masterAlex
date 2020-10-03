import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Item } from "../interfaces/Item";
import { AddItemPage } from "src/app/add-item/add-item.page";
import { StorageService } from '../services/storage/storage.service';

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
  constructor(
    public navCtrl: NavController,
    private plt: Platform,
    public storageService: StorageService,
  ) { 
    this.plt.ready().then(() => {
      this.loadItems();
    });
  }

  ngOnInit() {
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
