import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { HalfModalPage } from 'src/app/half-modal/half-modal.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  toggle = false;
  constructor(private storage: Storage, private modalCtrl: ModalController) {}

  async ngOnInit() {
    await this.storage.create();
    const dark = await this.storage.get('myshareDarkMode');
    if (dark === 'ON') {
      this.toggle = true;
    }
  }

  async toggleTheme(ev) {
    if (ev.detail.checked) {
      document.body.setAttribute('color-theme', 'dark');
      await this.storage.set('myshareDarkMode', 'ON');
    } else {
      document.body.setAttribute('color-theme', 'light');
      await this.storage.set('myshareDarkMode', 'OFF');
    }
  }

  async openPrivacyPolicy() {
    const modal = await this.modalCtrl.create({
      component: HalfModalPage,
      cssClass: 'half-modal',
      componentProps: {
        type: 'privacyPoicy',
      },
    });
    return await modal.present();
  }

  async opencontact() {
    const modal = await this.modalCtrl.create({
      component: HalfModalPage,
      cssClass: 'half-modal',
      componentProps: {
        type: 'contact',
      },
    });
    return await modal.present();
  }
}
