import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvatarSettingPageRoutingModule } from './avatar-setting-routing.module';

import { AvatarSettingPage } from './avatar-setting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvatarSettingPageRoutingModule
  ],
  declarations: [AvatarSettingPage]
})
export class AvatarSettingPageModule {}
