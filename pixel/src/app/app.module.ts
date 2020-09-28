import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AddItemPage } from './add-item/add-item.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { ItemDetailPage } from './item-detail/item-detail.page';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireAuthModule } from 'angularfire2/auth';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
// import'chartjs-plugin-zoom';

@NgModule({
  declarations: [AppComponent, AddItemPage, ItemDetailPage, AddItemPage],
  entryComponents: [],
  imports: [BrowserModule,  IonicStorageModule.forRoot(), IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    TodoListComponent,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  // entryComponents: [
  //   AddItemPage
  // ],
})
export class AppModule {}

// export const firebaseConfig = {
//   apiKey: "#######################################",
//   authDomain: "###########.firebaseapp.com",
//   databaseURL: "https://###########.firebaseio.com",
//   projectId: "###########",
//   storageBucket: "###########.appspot.com",
//   messagingSenderId: "############"
// };