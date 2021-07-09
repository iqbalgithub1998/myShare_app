import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {
  constructor(private popoverCtrl: PopoverController) {}

  ngOnInit() {}

  open(item) {
    this.popoverCtrl.dismiss({
      data: item,
    });
  }
}
