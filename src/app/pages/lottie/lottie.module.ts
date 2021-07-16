import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LottiePageRoutingModule } from './lottie-routing.module';

import { LottiePage } from './lottie.page';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
export const playerFactory = () => player;

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LottiePageRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  declarations: [LottiePage],
})
export class LottiePageModule {}
