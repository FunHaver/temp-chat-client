import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { ChatRoom } from '../interfaces/chat-room';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  removeSessionStorage(){
    sessionStorage.clear();
  }
  setSessionUser(user:User | null){
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  getSessionUser() : User | null{
    const sessionStoreUser:string | null = sessionStorage.getItem("user");
    if(sessionStoreUser){
      return JSON.parse(sessionStoreUser);
    } else {
      return null;
    }
  }

  setSessionRoom(chatRoom: ChatRoom | null){
    sessionStorage.setItem("chatRoom", JSON.stringify(chatRoom));
  }

  getSessionRoom() : ChatRoom | null {
    const sessionStoreRoom: string | null = sessionStorage.getItem("chatRoom");
    if(sessionStoreRoom){
      return JSON.parse(sessionStoreRoom);
    } else {
      return null;
    }
  }
}
