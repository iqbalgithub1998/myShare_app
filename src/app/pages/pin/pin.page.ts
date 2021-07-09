/* eslint-disable max-len */
/* eslint-disable eqeqeq */
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.page.html',
  styleUrls: ['./pin.page.scss'],
})
export class PinPage implements OnInit {
  @Input() fileName: string;
  myInput: any;
  isDisplay = false;
  ionViewLoaded = false;
  input1: number;
  input2: number;
  input3: number;
  input4: number;
  input5: number;
  input6: number;
  ininput6: boolean;
  showbutton: string;

  constructor(private modalCtrl: ModalController) {
    this.showbutton = 'Show';
    this.ininput6 = false;
  }

  ngOnInit() {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
    setTimeout(() => {
      const inputTag = document.querySelector('#input1');
      if (inputTag != null) {
        this.myInput = inputTag;
      }
      this.myInput.focus();
    }, 150);
  }
  ionViewDidEnter() {
    if (!this.ionViewLoaded) {
      this.ionViewLoaded = true;
      this.ionViewDidLoad();
    }
  }

  move(txt0, txt1, txt2, e: KeyboardEvent) {
    const id = txt1.id;
    const { key } = e;
    if (key === 'Backspace' || key === 'Delete') {
      if (id == 'input1') {
        this.input1 = null;
      } else if (id == 'input2') {
        txt0.focus();
        this.input1 = null;
      } else if (id == 'input3') {
        txt0.focus();
        this.input2 = null;
      } else if (id == 'input4') {
        txt0.focus();
        this.input3 = null;
      } else if (id == 'input5') {
        txt0.focus();
        this.input4 = null;
      } else if (id == 'input6') {
        if (this.ininput6 == false) {
          this.input6 = null;
          this.ininput6 = true;
        } else {
          txt0.focus();
          this.input5 = null;
        }
      }
    } else {
      if (id == 'input6') {
        this.ininput6 = false;
      }
      const val = txt1.value;
      if (val.length === 1) {
        txt2.focus();
      }
    }
  }

  switchEye() {
    const showInput = document.querySelectorAll('.inputcheck');
    if (this.isDisplay === false) {
      this.isDisplay = true;
      let i;
      for (i = 0; i < showInput.length; i++) {
        showInput[i].classList.add('inputshow');
        showInput[i].classList.remove('input');
      }
      this.showbutton = 'Hide';
    } else {
      this.isDisplay = false;
      let i;
      for (i = 0; i < showInput.length; i++) {
        showInput[i].classList.remove('inputshow');
        showInput[i].classList.add('input');
      }
      this.showbutton = 'Show';
    }
  }

  closeModal() {
    let pin = '';
    pin =
      this.input1.toString() +
      this.input2.toString() +
      this.input3.toString() +
      this.input4.toString() +
      this.input5.toString() +
      this.input6.toString();
    // eslint-disable-next-line radix
    const num = parseInt(pin);
    this.modalCtrl.dismiss({
      pin: num,
    });
  }
}
