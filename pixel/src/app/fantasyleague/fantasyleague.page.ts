import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-fantasyleague',
  templateUrl: './fantasyleague.page.html',
  styleUrls: ['./fantasyleague.page.scss'],
})
export class FantasyleaguePage implements OnInit {

  constructor(
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
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
