/* eslint-disable max-len */
import { PinPage } from '../pin/pin.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UploadService } from '../../services/upload.service';
import { ToastService } from 'src/app/services/toast.service';
import { Storage } from '@ionic/storage-angular';
import { Clipboard } from '@capacitor/clipboard';
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  file: any;
  selectFileText = 'Select Your File';
  pin: any;
  url: any;
  showURL: boolean;
  showProgress: boolean;
  emailTo: any;
  emailFrom: any;
  constructor(
    private modalCtrl: ModalController,
    private uploadService: UploadService,
    private toastService: ToastService,
    private storage: Storage
  ) {
    this.showProgress = false;
    this.showURL = false;
  }

  async ngOnInit() {
    await this.storage.create();
  }

  ionViewDidEnter() {
    this.file = null;
    this.selectFileText = 'Select Your File';
    this.showProgress = false;
    this.showURL = false;
  }

  uploadFile(event: Event) {
    console.log('file clicked');
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList) {
      this.file = fileList[0];
      if (this.file.size > 3e6) {
        this.file = null;
        this.toastService.showToast('File size is grater then 3MB');
      } else {
        this.selectFileText = this.file.name;
        this.presentModal();
      }
    }
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: PinPage,
      cssClass: 'my-custom-class',
      componentProps: {
        fileName: `${this.selectFileText}`,
      },
    });
    modal.onDidDismiss().then((data: any) => {
      if (data.data) {
        this.showProgress = true;
        this.pin = data.data.pin;
        setTimeout(async () => {
          const progress = document.querySelector('.progress');
          this.uploadService
            .uploadImage(this.file, this.pin, progress)
            .then((res) => {
              console.log(res);
              this.showProgress = false;
              this.url = res;
              this.showURL = true;
              const formData = {
                uuid: this.url.file.split('/').splice(-1, 1)[0],
                pin: this.pin,
              };
              this.uploadService.setpin(formData).then(async (jsondata) => {
                const fileArray = await this.storage.get('goShareMyFiles');
                if (fileArray) {
                  console.log(fileArray);
                  fileArray.push(jsondata);
                  await this.storage.set('goShareMyFiles', fileArray);
                } else {
                  const file = [];
                  file.push(jsondata);
                  await this.storage.set('goShareMyFiles', file);
                }
              });
            })
            .catch((err) => {
              this.showProgress = false;
              this.toastService.showToast(err);
            });
        }, 1000);
      }
    });

    return await modal.present();
  }

  validateEmail(email) {
    // eslint-disable-next-line max-len
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  writeToClipboard = async () => {
    await Clipboard.write({
      url: this.url.file,
    })
      .then(() => {
        this.toastService.showToast('save to clipboard');
      })
      .catch(() => {
        this.toastService.showToast('error in save to clipboard');
      });
  };
}
