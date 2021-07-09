import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'files',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/files/files.module').then(
                (m) => m.FilesPageModule
              ),
            data: {
              preload: true,
            },
          },
        ],
      },
      {
        path: 'add',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/add/add.module').then((m) => m.AddPageModule),
            data: {
              preload: true,
            },
          },
        ],
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/profile/profile.module').then(
                (m) => m.ProfilePageModule
              ),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/home/files',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
