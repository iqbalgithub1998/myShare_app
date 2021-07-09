import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HalfModalPageRoutingModule } from './half-modal-routing.module';

import { HalfModalPage } from './half-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HalfModalPageRoutingModule
  ],
  declarations: [HalfModalPage]
})
export class HalfModalPageModule {}
