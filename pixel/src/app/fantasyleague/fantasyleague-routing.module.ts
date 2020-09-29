import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FantasyleaguePage } from './fantasyleague.page';

const routes: Routes = [
  {
    path: '',
    component: FantasyleaguePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FantasyleaguePageRoutingModule {}
