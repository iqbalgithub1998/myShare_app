/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  host = 'https://go-share-mik.herokuapp.com/';
  deleteURL = `${this.host}api/files/delete`;
  uploadURL = `${this.host}api/files`;
  pinURL = `${this.host}api/files/pin`;
  constructor(private toastService: ToastService) {}

  uploadImage(file: any, pin: any, progressBar: any) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('myfile', file);

      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          progressBar.value = 1;
          progressBar.buffer = 1;
          resolve(JSON.parse(xhr.responseText));
        }
      };
      xhr.upload.onerror = () => {
        reject(xhr.statusText);
      };

      xhr.upload.onprogress = (e) => {
        const percent = ((e.loaded / e.total) * 100) / 100;
        progressBar.value = percent;
        progressBar.buffer = percent + 0.1;
      };

      xhr.open('POST', this.uploadURL, true);
      xhr.send(formData);
    });
  }

  setpin(formData) {
    return new Promise((resolve, reject) => {
      fetch(this.pinURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          const json = JSON.stringify(data.file);
          resolve(json);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  deleteFile(uuid) {
    return new Promise((resolve, reject) => {
      fetch(this.deleteURL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uuid),
      })
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
