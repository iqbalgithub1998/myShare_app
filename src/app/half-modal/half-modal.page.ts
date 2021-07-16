import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-half-modal',
  templateUrl: './half-modal.page.html',
  styleUrls: ['./half-modal.page.scss'],
})
export class HalfModalPage implements OnInit {
  @Input() type: string;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  ionViewDidEnter() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
