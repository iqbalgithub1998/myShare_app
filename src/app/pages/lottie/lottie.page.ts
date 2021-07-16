import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-lottie',
  templateUrl: './lottie.page.html',
  styleUrls: ['./lottie.page.scss'],
})
export class LottiePage implements OnInit {
  options: AnimationOptions = {
    path: '/assets/success.json',
  };
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    setTimeout(() => {
      this.modalCtrl.dismiss();
    }, 3500);
  }
}
