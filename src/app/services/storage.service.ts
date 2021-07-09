import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {
    this.loadStorage();
  }

  async loadStorage() {
    await this.storage.create();
  }

  getFile() {
    return new Promise(async (resolve, reject) => {
      const file = await this.storage.get('goShareMyFiles');
      console.log(file);
      if (file == null) {
        return reject(new Error('No file Found'));
      } else {
        const files = [];
        file.forEach((element) => {
          files.push(JSON.parse(element));
        });
        resolve(files);
      }
    });
  }
}
