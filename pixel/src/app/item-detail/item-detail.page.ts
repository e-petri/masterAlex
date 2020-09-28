import { StorageService } from './../services/storage/storage.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {
  @Input() firstName: string;

  constructor(  public modalController: ModalController,     public storageService: StorageService) { }

  ngOnInit() {
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  onSave (){
    // this.storageService.updateItem(item);
  }
  // updateItem(item: Item) {
  //   // item.title = "UPDATED: ${item.title}";
  //   item.title = JSON.parse(item.title);
  //   item.modified = Date.now();

  //   this.storageService.updateItem(item).then((item) => {
  //     this.showToast("Item updated!");
  //     this.myList.closeSlidingItems();
  //     this.loadItems();
  //   });
  // }
}
