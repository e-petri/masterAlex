import { Component, OnInit } from '@angular/core';
import {
  NavController,
  AlertController,
  Platform,
  ToastController,
  ModalController,
} from "@ionic/angular";

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  constructor(
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  navToPage(pageName: string) {
    if (pageName === "statistic") {
      this.navCtrl.navigateForward("/statistic");
    } else if (pageName === "home") {
      this.navCtrl.navigateForward("/home");
    } else if (pageName === "fantasyleague") {
      this.navCtrl.navigateForward("/fantasyleague");
    }
    else if (pageName === "store") {
      this.navCtrl.navigateForward("/store");
    }
  }
}