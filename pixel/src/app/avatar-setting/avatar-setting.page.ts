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
  selector: 'app-avatar-setting',
  templateUrl: './avatar-setting.page.html',
  styleUrls: ['./avatar-setting.page.scss'],
})
export class AvatarSettingPage implements OnInit {
  foxPath = "../../../assets/icon/Fox1.png";
  startFox = null;
  activeFox2: Boolean;
  activeFox3: Boolean;
  activeFox4: Boolean;
  activeFox5: Boolean;
  constructor(
    public navCtrl: NavController,
    public storageService: StorageService,
  ) {
    this.activeFox2 = true;
    this.activeFox3 = true;
    this.activeFox4 = true;
    this.activeFox5 = true;
  }

  async setFoxStatus() {
    let aStatus = [false, false, false, false];
    for(let i = 2; i < 6; i++)
      aStatus[i] = await this.storageService.getFoxStatus(i);

    this.activeFox2 = aStatus[2];
    this.activeFox3 = aStatus[3];
    this.activeFox4 = aStatus[4];
    this.activeFox5 = aStatus[5];
    console.log("setFoxStatusRdy")
  }

  async ngOnInit() {
    let foxNr = await this.storageService.getFoxNr();
    this.startFox = foxNr;
    this.setFoxPath(foxNr);
    await this.setFoxStatus();
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
  }

  async foxAvatar(value: any) {
    this.storageService.setFoxNr(value);
    this.setFoxPath(value);
    await this.setFoxStatus();
  }
}
