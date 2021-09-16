import { Component } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Observable, Observer } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ocr';
  constructor(private app_service: AppService) { }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  base64TrimmedURL: string = ''

  text_data: string = ''

  generatedImage: string = ''

  croppedImage2:any

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  async imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    // console.log(this.croppedImage);

    // this.base64TrimmedURL = this.croppedImage || ''

    // this.croppedImage2:Blob= this.dataURItoBlob(this.base64TrimmedURL);

  }

  SubmitData(){

    this.app_service.getTextData(this.croppedImage).subscribe((data: any) => {
      this.text_data = data.data

      console.log(data.data);
      
    })
  }

  // createBlobImageFileAndShow(): void {
  //   this.dataURItoBlob(this.base64TrimmedURL).subscribe((blob: Blob) => {
  //     const imageBlob: Blob = blob;
  //     const imageName: string = this.generateName();
  //     const imageFile: File = new File([imageBlob], imageName, {
  //       type: "image/jpeg"
  //     });
  //     this.generatedImage = window.URL.createObjectURL(imageFile);
  //     window.open(this.generatedImage);
  //   });
  // }

  dataURItoBlob(dataURI: string) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/jpg'
    });
  }

  //   /* Method to convert Base64Data Url as Image Blob */
  // dataURItoBlob(dataURI: string): Observable<Blob> {
  //   return Observable.create((observer: Observer<Blob>) => {
  //     const byteString: string = window.atob(dataURI);
  //     const arrayBuffer: ArrayBuffer = new ArrayBuffer(byteString.length);
  //     const int8Array: Uint8Array = new Uint8Array(arrayBuffer);
  //     for (let i = 0; i < byteString.length; i++) {
  //       int8Array[i] = byteString.charCodeAt(i);
  //     }
  //     const blob = new Blob([int8Array], { type: "image/jpeg" });
  //     observer.next(blob);
  //     observer.complete();
  //   });
  // }

  /**Method to Generate a Name for the Image */
  generateName(): string {
    const date: number = new Date().valueOf();
    let text: string = "";
    const possibleText: string =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      text += possibleText.charAt(
        Math.floor(Math.random() * possibleText.length)
      );
    }
    // Replace extension according to your media type like this
    return date + "." + text + ".jpeg";
  }
  imageLoaded(image: any) {
    console.log(image);

    // show cropper
  }
  cropperReady() {
    console.log('ready');
    
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}
