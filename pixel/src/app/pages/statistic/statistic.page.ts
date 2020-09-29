import { StorageService } from './../../services/storage/storage.service';
import { ItemDetailPage } from "../../item-detail/item-detail.page";
//import { StorageService } from "../../services/storage/storage.service";
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

import { Chart } from "chart.js";
import { OnInit } from "@angular/core";

const NUM_DAYS = 8;

@Component({
  selector: "app-statistic",
  templateUrl: "statistic.page.html",
  styleUrls: ["statistic.page.scss"],
})
export class StatisticPage implements OnInit {
  @ViewChild("barCanvas") barCanvas: ElementRef;
  private barChart: Chart;
  items: Item[] = [];
  newItem: Item = <Item>{};
  item: string;
  // today = new Date();
  today;
  countStorageData: number;
  doneStorageData: number;
  unfinishedStorageData: number;
  avatarInfo;
  dd;
  mm;
  yyyy;
  todayDate;
  dataSetFox = [2, 2, 2, 2, 2, 2, 2, 2];
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
    this.plt.ready().then(() => {});

    this.getItemsData();
    this.getDate("all");
    //this.storageService.getToDoList();
  }
  ngOnInit() {
    this.dummyChart();
    this.dataForChart();
  }

  ionViewDidLoad() {
    setTimeout(() => {
      // this.myList.setFocus();
    }, 350);
  }

  getDate(askedFor: string) {
    this.today = new Date();
    console.log("this.today", this.today);

    this.dd = String(this.today.getDate()).padStart(2, "0");
    this.mm = String(this.today.getMonth() + 1).padStart(2, "0"); //January is 0!
    this.yyyy = this.today.getFullYear();

    this.todayDate = this.dd + "/" + this.mm + "/" + this.yyyy

    console.log("this.date", this.todayDate);
  }


  async dummyChart() {

    /****** init value counter array days ******/
    var cntItems = [0, 0, 0, 0, 0, 0, 0, 0];
    let dataStor = await this.storageService.getItems();
    
    /***** get playerData *****/
    var i;
    for (i = 0; i < NUM_DAYS; i++) {
      dataStor.forEach(cntup);
      function cntup(item, index) {
        var tempCreatedAt = new Date();
        var datetest = tempCreatedAt.getDate() - i;
        tempCreatedAt.setDate(datetest);
        let compareTest = tempCreatedAt.toLocaleDateString();
        if(item.finishedAt == compareTest)
          cntItems[NUM_DAYS-1-i]++;
      }
    }
    console.log("Datastore cntItems: ", cntItems);
    
    Chart.defaults.global.elements.line.fill = false;
    var ctx = document.getElementById("line-chart");
    //var ctx = document.getElementById("line-chart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          this.dd - 7 + "/" + this.mm,
          this.dd - 6 + "/" + this.mm,
          this.dd - 5 + "/" + this.mm,
          this.dd - 4 + "/" + this.mm,
          this.dd - 3 + "/" + this.mm,
          this.dd - 2 + "/" + this.mm,
          this.dd - 1 + "/" + this.mm,
          this.dd + "/" + this.mm,
        ],
        datasets: [
          {
            data: cntItems,
            label: "TaskFox",
            borderColor: "#3e95cd",
            fill: false,
          },
          {
            data: this.dataSetFox,
            label: "Enemy",
            borderColor: "#8e5ea2",
            fill: false,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Deine erledigten Tasks vs Gegner",
        },
      },
    });
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
            console.log("Confirm Ok");
            console.log("item.title", item);
          },
        },
      ],
    });

    await alert.present();
  }
  navToPage(pageName: string) {
    if (pageName === "statistic") {
      this.navCtrl.navigateForward("/statistic");
    } else if (pageName === "home") {
      this.navCtrl.navigateForward("/home");
    } else if (pageName === "fantasyleague") {
      this.navCtrl.navigateForward("/fantasyleague");
    }
  }
  async dataForChart() {
    const data = await this.storageService.getItems();
    const dataStorage = data.filter((items) => items.finishedAt !== this.todayDate);
    const testDataStorage = data.filter(
      (items) => items.finishedAt === this.todayDate
    );

    // const day = data.filter((items) => items.finishedAt.split(' ') );
    // console.log('day', day);
    console.log("notEqual", dataStorage, "equalToday", testDataStorage);
  }
  async getItemsData() {
    //get data from storage
    const storageData = await this.storageService.getItems();
    console.log("storageData", storageData);

    this.countStorageData = storageData.length;
    console.log("countStorageData", this.countStorageData);

    this.doneStorageData = storageData.filter(
      (items) => items.finishedAt !== null
    ).length;
    console.log("doneStorageData", this.doneStorageData);

    this.unfinishedStorageData = this.countStorageData - this.doneStorageData;
    //alle Projekte durchlaufen und count() wie viele Projekte es sind (auf counter aufaddieren)
    // dann alle Projekte durchsucen mit einem finishedAt !== null
    // ausgabe beider Daten

    //dann Daten für Diagramm
    // vorher vielleicht noch die DatePipe machen?
    // alle Projekte filtern nach finshedAt date in den letzten 7/8 Tagen lagen
    // zählen wie viele Todos finishedAt an einem Tag hatten = Zahl von dem Tag
    //
  }
}
