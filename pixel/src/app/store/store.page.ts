import { Component, OnInit } from '@angular/core';
import {
  NavController,
  AlertController,
  Platform,
  ToastController,
  ModalController,
} from "@ionic/angular";
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  money = 0;
  activeFox2: Boolean;
  activeFox3: Boolean;
  activeFox4: Boolean;
  activeFox5: Boolean;
  chartDonut: Boolean;
  chartBurn: Boolean;
  constructor(
    public navCtrl: NavController,
    public storageService: StorageService,
    private toastController: ToastController,
  ) {
    this.activeFox2 = true;
    this.activeFox3 = true;
    this.activeFox4 = true;
    this.activeFox5 = true;
    this.chartDonut = true;
    this.chartBurn = true;
  }

  async ngOnInit() {
    this.money = await this.storageService.getMoney();
    await this.setFoxStatus();
    await this.setChartStatus();
  }

  async setFoxStatus() {
    let aStatus = [false, false, false, false];
    for(let i = 2; i < 6; i++)
      aStatus[i] = await this.storageService.getFoxStatus(i);

    this.activeFox2 = !aStatus[2];
    this.activeFox3 = !aStatus[3];
    this.activeFox4 = !aStatus[4];
    this.activeFox5 = !aStatus[5];
    console.log("setFoxStatusRdy")
  }

  async setChartStatus() {
    let aStatus = [false, false];
    for(let i = 0; i < 2; i++)
      aStatus[i] = await this.storageService.getChartVisible(i);

    this.chartDonut = !aStatus[0];
    this.chartBurn = !aStatus[1];
  }

  async chartStatus(value: any, price) {
    if(price > this.money)
      this.showToast("sorry, du hast noch nicht genügend Mäuse", "danger");
    else {
      this.storageService.setChartVisible(value);
      await this.setChartStatus();
      await this.storageService.setMoney("subMoney", price);
      await this.ngOnInit();
      this.showToast("super, Avatar zu deinem Inventar hinzugefügt", "medium");
    }
  }

  async foxAvatar(value: any, price) {
    if(price > this.money)
      this.showToast("sorry, du hast noch nicht genügend Mäuse", "danger");
    else {
      this.storageService.setFoxStatus(value);
      await this.setFoxStatus();
      await this.storageService.setMoney("subMoney", price);
      await this.ngOnInit();
      this.showToast("super, Avatar zu deinem Inventar hinzugefügt", "medium");
    }
  }

  async showToast(msg, colorMsg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: colorMsg,
      animated: true,
    });
    toast.present();
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