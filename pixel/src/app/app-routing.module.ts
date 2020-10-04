import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'add-item',
    loadChildren: () => import('./add-item/add-item.module').then( m => m.AddItemPageModule)
  },
  {
    path: 'item-detail',
    loadChildren: () => import('./item-detail/item-detail.module').then( m => m.ItemDetailPageModule)
  },
  {
    path: 'statistic',
    loadChildren: () => import('./pages/statistic/statistic.module').then( m => m.StatisticPageModule)
  },  {
    path: 'fantasyleague',
    loadChildren: () => import('./fantasyleague/fantasyleague.module').then( m => m.FantasyleaguePageModule)
  },
  {
    path: 'store',
    loadChildren: () => import('./store/store.module').then( m => m.StorePageModule)
  },
  {
    path: 'avatar-setting',
    loadChildren: () => import('./avatar-setting/avatar-setting.module').then( m => m.AvatarSettingPageModule)
  },
  {
    path: 'story',
    loadChildren: () => import('./story/story.module').then( m => m.StoryPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
