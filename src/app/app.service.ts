import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) { }

  getTextData(image:string){
    let body={
      image:image
    }
    return this.http.post('http://localhost:5000/readimage',body)

  }

}
