import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { StatisticPage } from './statistic.page';
// import {ChartsModule} from './statistic.page';
import { StatisticPageRoutingModule } from './statistic-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatisticPageRoutingModule
  ],
  declarations: [StatisticPage]
})
export class StatisticPageModule {}
