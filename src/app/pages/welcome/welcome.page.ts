import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  selectedSlide: any;

  constructor(private router: Router, private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
    const check = await this.storage.get('goshareIntroDone');
    if (check != null) {
      if (check.intro) {
        this.router.navigate(['home']);
      }
    }
  }

  async next() {
    await this.storage.set('goshareIntroDone', { intro: true });
    this.router.navigate(['home']);
  }
}
