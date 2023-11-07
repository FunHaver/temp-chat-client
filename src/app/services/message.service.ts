import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private api: RestApiService) { }

  postMessage(message: Object){
    const newMessageRequest = this.api.apiPost('message/new', message);

    newMessageRequest.subscribe(resp => {
      console.log(resp);
    })
  }
}
