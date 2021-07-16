import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('tabs', { static: false }) tabs: IonTabs;
  selectedTab: any;
  constructor() {}

  ngOnInit() {}
  setCurrentTab(t1, t2, t3) {
    this.selectedTab = this.tabs.getSelected();
    if (this.selectedTab === 'files') {
      t1.classList.add('slideUp');
      t2.classList.remove('slideUp');
      t3.classList.remove('slideUp');
    } else if (this.selectedTab === 'add') {
      t1.classList.remove('slideUp');
      t2.classList.add('slideUp');
      t3.classList.remove('slideUp');
    } else if (this.selectedTab === 'profile') {
      t1.classList.remove('slideUp');
      t2.classList.remove('slideUp');
      t3.classList.add('slideUp');
    }
  }
}
