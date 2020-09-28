import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage {
  title: string;
  description: string;
  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }
  saveItem(){

    let newItem = {
      // title: this.title,
      // description: this.description
    };

    // this.view.dismiss(newItem);

  }

  close(){
    // this.view.dismiss();
  }
}
