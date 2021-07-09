import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./index/index.module').then((m) => m.IndexPageModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'pincheckmik',
    loadChildren: () =>
      import('./pages/pin/pin.module').then((m) => m.PinPageModule),
  },
  {
    path: 'popover',
    loadChildren: () =>
      import('./popover/popover.module').then((m) => m.PopoverPageModule),
  },
  {
    path: 'half-modal',
    loadChildren: () => import('./half-modal/half-modal.module').then( m => m.HalfModalPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
