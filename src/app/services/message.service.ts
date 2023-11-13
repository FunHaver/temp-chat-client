import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { Message } from '../interfaces/message';
import * as dayjs from 'dayjs';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private api: RestApiService) { }

  validateMessage(user: string | undefined, chatRoom: string | undefined, content: string | null): Message {
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
        userId: user, 
         // @ts-ignore 
        chatRoomId: chatRoom,
         // @ts-ignore 
        content: content,
        creationTime: dayjs()
      }
    }
  }

  postMessage(message: Message){
    return this.api.apiPost('message/new', message);
  }
}
