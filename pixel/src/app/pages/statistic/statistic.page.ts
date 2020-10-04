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
  activeDonut: Boolean;
  activeBurn: Boolean;
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
    this.activeDonut = true;
    this.activeBurn = true;
    //this.storageService.getToDoList();
  }
  ngOnInit() {
    this.dummyChart();
    this.dummyChartBurn();
    this.dummyChartDonut();
    this.dataForChart();
    this.calcExpectation();
    this.setDatasetEnemy();
    this.setChartVisible();
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

  async setChartVisible() {
    let aStatus = [true, true];
    for(let i = 0; i < 2; i++)
      aStatus[i] = await this.storageService.getChartVisible(i);

    this.activeDonut = aStatus[0];
    this.activeBurn = aStatus[1];
  }

  async calcExpectation () {
    
    var dateComp = [null, null, null, null, null, null, null, null];
    var cntItems = [0, 0, 0, 0, 0, 0, 0, 0];
    let dataStor = await this.storageService.getItems();
    let cntTotalItems = 0;

    var i = 0;
    for (i = 0; i < NUM_DAYS; i++) {
      dataStor.forEach(cntup);
      function cntup(item, index) {
        var tempCreatedAt = new Date();
        var datetest = tempCreatedAt.getDate() - i;
        tempCreatedAt.setDate(datetest);
        let compareTest = tempCreatedAt.toLocaleDateString();
        dateComp[i] = compareTest;
        if(item.createdAt == compareTest) {
          cntTotalItems++;
          cntItems[NUM_DAYS-1-i]++;
        }
      }
    }
    await this.storageService.setExpectationTasks(cntTotalItems);
    return cntItems;
  }

  async setDatasetEnemy() {
    let difficulty = await this.storageService.getExpecationDifficulty();
    let createdTasks = await this.storageService.getExpecationTasks();
    let i = 0;
    for(i = 0; i < NUM_DAYS; i++) {
      this.dataSetFox[i] = Math.floor(createdTasks/difficulty);
    }
  }

  async dummyChart() {

    /****** init value counter array days ******/
    let dataStor = await this.storageService.getItems();
    var dateComp = [null, null, null, null, null, null, null, null];
    var cntItems = [0, 0, 0, 0, 0, 0, 0, 0];
    /***** get playerData *****/
    var i;
    for (i = 0; i < NUM_DAYS; i++) {
      dataStor.forEach(cntup);
      function cntup(item, index) {
        var tempCreatedAt = new Date();
        var datetest = tempCreatedAt.getDate() - i;
        tempCreatedAt.setDate(datetest);
        let compareTest = tempCreatedAt.toLocaleDateString();
        dateComp[i] = compareTest;
        if(item.finishedAt == compareTest)
          cntItems[NUM_DAYS-1-i]++;
      }
    }
    console.log("Datastore cntItems: ", cntItems);

    await this.calcExpectation();
    await this.setDatasetEnemy();
    
    Chart.defaults.global.elements.line.fill = false;
    var ctx = document.getElementById("line-chart");
    //var ctx = document.getElementById("line-chart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          dateComp[7],
          dateComp[6],
          dateComp[5],
          dateComp[4],
          dateComp[3],
          dateComp[2],
          dateComp[1],
          dateComp[0],
        ],
        datasets: [
          {
            data: cntItems,
            label: "TaskFox",
            borderColor: "#D9762E",
            fill: true,
            backgroundColor: "#ffc296",
            steppedLine: false,
          },
          {
            data: this.dataSetFox,
            label: "Zielwert",
            borderColor: "#b3ab9d",
            fill: false,
            steppedLine: false,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Deine erledigten Tasks vs täglliches Ziel",
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

    this.countStorageData = storageData.length-14;
    console.log("countStorageData", this.countStorageData);

    this.doneStorageData = storageData.filter(
      (items) => items.finishedAt !== null
    ).length;
    this.doneStorageData -= 14;
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

  async dummyChartBurn() {
    var dateComp = [null, null, null, null, null, null, null, null];
    var cntItems = [0, 0, 0, 0, 0, 0, 0, 0];

    await this.setChartVisible();

    if(this.activeBurn === false) {
      var outputCreated = await this.calcExpectation();

      /****** init value counter array days ******/
      let dataStor = await this.storageService.getItems();
      
      var i;
      for (i = 0; i < NUM_DAYS; i++) {
        dataStor.forEach(cntup);
        function cntup(item, index) {
          var tempCreatedAt = new Date();
          var datetest = tempCreatedAt.getDate() - i;
          tempCreatedAt.setDate(datetest);
          let compareTest = tempCreatedAt.toLocaleDateString();
          dateComp[i] = compareTest;
          if(item.finishedAt == compareTest)
            cntItems[NUM_DAYS-1-i]++;
        }
      }
      console.log("Datastore cntItems: ", cntItems);
    }
    
    Chart.defaults.global.elements.line.fill = false;
    var ctx = document.getElementById("burn-chart");
    //var ctx = document.getElementById("line-chart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          dateComp[7],
          dateComp[6],
          dateComp[5],
          dateComp[4],
          dateComp[3],
          dateComp[2],
          dateComp[1],
          dateComp[0],
        ],
        datasets: [
          {
            data: outputCreated,
            label: "Erstellt",
            backgroundColor: "#524F49",
            fill: true,
          },
          {
            data: cntItems,
            label: "Erledigt",
            backgroundColor: "#D9762E",
            fill: false,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Deine erstellten Tasks vs erledigten Tasks",
        },
      },
    });
  }

  async dummyChartDonut() {
    var dateComp = [null, null, null, null, null, null, null, null];
    var cntItems = [0, 0, 0, 0, 0, 0, 0, 0];
    var finishedTasks = 2;
    var unfinishedTasks = 2;

    await this.setChartVisible();
    var outputCreated = await this.calcExpectation();

    /****** init value counter array days ******/
    let dataStor = await this.storageService.getItems();
    
    if(this.activeDonut === false) {
      finishedTasks = this.doneStorageData;
      unfinishedTasks = this.unfinishedStorageData;
      var i;
      for (i = 0; i < NUM_DAYS; i++) {
        dataStor.forEach(cntup);
        function cntup(item, index) {
          var tempCreatedAt = new Date();
          var datetest = tempCreatedAt.getDate() - i;
          tempCreatedAt.setDate(datetest);
          let compareTest = tempCreatedAt.toLocaleDateString();
          dateComp[i] = compareTest;
          if(item.finishedAt == compareTest)
            cntItems[NUM_DAYS-1-i]++;
        }
      }
      console.log("Datastore cntItems: ", cntItems);
    }
    
    Chart.defaults.global.elements.line.fill = false;
    var ctx = document.getElementById("donut-chart");
    //var ctx = document.getElementById("line-chart").getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [
          "Offen",
          "Erledigt"
        ],
        datasets: [
          {
            data: [unfinishedTasks, finishedTasks],
            label: "Erstellt",
            backgroundColor: ["#b3ab9d", "#D9762E"],
            fill: true,
          }
        ],
      },
      options: {
        title: {
          display: true,
          text: "Deine offenen Tasks vs erledigten Tasks",
        },
      },
    });
  }
}


