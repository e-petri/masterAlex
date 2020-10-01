import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvatarSettingPage } from './avatar-setting.page';

const routes: Routes = [
  {
    path: '',
    component: AvatarSettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvatarSettingPageRoutingModule {}
