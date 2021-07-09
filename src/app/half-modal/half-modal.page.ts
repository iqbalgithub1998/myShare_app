import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-half-modal',
  templateUrl: './half-modal.page.html',
  styleUrls: ['./half-modal.page.scss'],
})
export class HalfModalPage implements OnInit {
  @Input() file: string;
  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    console.log(this.file);
  }

  getName(filename) {
    for (let i = 0; i < filename.length; i++) {
      if (
        (filename.charAt(i) >= 'A' && filename.charAt(i) <= 'Z') ||
        (filename.charAt(i) >= 'a' && filename.charAt(i) <= 'z')
      ) {
        return filename.substring(i, filename.length);
      }
    }
  }
}
