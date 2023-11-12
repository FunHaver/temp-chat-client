import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { Message } from '../interfaces/message';
import { User } from '../interfaces/user';
import { ChatRoom } from '../interfaces/chat-room';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private api: RestApiService) { }

  validateMessage(user: User | null, chatRoom: ChatRoom | null, content: string | null): Message {
    let errorMessage: string = "";
    if(user === null || user === undefined){
      errorMessage += "User not set\n";
    }
    if(chatRoom === null || chatRoom === undefined){
      errorMessage += "Chat Room not set\n";
    }
    if(content === null || content === undefined || content.length === 0){
      errorMessage += "Message empty\n";
    }

    if(errorMessage.length > 0){
      throw new Error(errorMessage)
    } else {
      return {
         // @ts-ignore 
        user: user, 
         // @ts-ignore 
        chatRoom: chatRoom,
         // @ts-ignore 
        content: content,
        creationTime: moment()
      }
    }
  }

  postMessage(message: Message){
    const newMessageRequest = this.api.apiPost('message/new', message);
    newMessageRequest.subscribe(resp => {
      console.log(resp);
    })
  }
}
