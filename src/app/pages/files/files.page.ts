/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { PopoverPage } from 'src/app/popover/popover.page';
import { ToastService } from 'src/app/services/toast.service';
import { Clipboard } from '@capacitor/clipboard';
import { UploadService } from 'src/app/services/upload.service';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-files',
  templateUrl: './files.page.html',
  styleUrls: ['./files.page.scss'],
})
export class FilesPage implements OnInit {
  files = [];
  constructor(
    private storage: Storage,
    private toastService: ToastService,
    private popoverController: PopoverController,
    private uploadService: UploadService
  ) {}

  async ngOnInit() {
    console.log('darkMode');

    await this.storage.create();
    const darkMode = await this.storage.get('myshareDarkMode');
    if (darkMode === 'ON') {
      document.body.setAttribute('color-theme', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
    }
  }

  async ionViewDidEnter() {
    await this.storage
      .get('goShareMyFiles')
      .then((files) => {
        if (files) {
          this.files = [];
          files.forEach((element) => {
            this.files.push(JSON.parse(element));
          });
        }
      })
      .catch((err) => {
        this.toastService.showToast(err.message);
      });
  }

  getDate(date) {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}-${d.getHours()}:${d.getMinutes()}`;
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

  async handleButtonClick(ev, uuid) {
    const popover = await this.popoverController.create({
      component: PopoverPage,
      event: ev,
      translucent: true,
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
    if (data) {
      const result = this.files.find((obj) => obj.uuid === uuid);
      if (data.data === 'delete') {
        const formValue = {
          uuid: result.uuid,
        };
        this.uploadService.deleteFile(formValue).then(async (res) => {
          if (res) {
            const index = this.files.findIndex(
              (file) => file.uuid === result.uuid
            );
            this.files.splice(index, 1);
            this.toastService.showToast(res['success']);
          }
        });
      } else if (data.data === 'getLink') {
        const link =
          'https://goshare-mik.herokuapp.com/' + 'files/' + result.uuid;
        this.writeToClipboard(link);
      }
    }
  }

  openfile(file) {
    console.log(file);
  }

  writeToClipboard = async (link) => {
    await Clipboard.write({
      url: link,
    })
      .then(() => {
        this.toastService.showToast('Save to clipboard');
      })
      .catch(() => {
        this.toastService.showToast('error in save to clipboard');
      });
  };
}
