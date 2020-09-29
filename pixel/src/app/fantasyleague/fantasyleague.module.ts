import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FantasyleaguePageRoutingModule } from './fantasyleague-routing.module';

import { FantasyleaguePage } from './fantasyleague.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FantasyleaguePageRoutingModule
  ],
  declarations: [FantasyleaguePage]
})
export class FantasyleaguePageModule {}
