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
  activeFlowerPower: Boolean;
  constructor(
    public navCtrl: NavController,
    public storageService: StorageService,
  ) {
    this.activeFlowerPower = true;
  }

  async ngOnInit() {
    let foxNr = await this.storageService.getFoxNr();
    this.startFox = foxNr;
    this.setFoxPath(foxNr);
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
    else
      this.foxPath = "../../../assets/icon/Fox0.png";
  }

  async foxAvatar(value: any) {
    this.storageService.setFoxNr(value);
    this.setFoxPath(value);
  }
}
