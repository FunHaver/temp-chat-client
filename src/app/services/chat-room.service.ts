import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { ChatRoom } from '../interfaces/chat-room';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { SessionStorageService } from './session-storage.service';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {
  messages:Array<Message> = [];
  constructor(private api: RestApiService, private sessionStorageService: SessionStorageService, private router: Router) { 

  }
  
  navigateToRoom(body: any){
    let chatRoom: ChatRoom = body.chatRoom;
    let user: User = body.user;
    this.sessionStorageService.setSessionUser(user);
    this.sessionStorageService.setSessionRoom(chatRoom);
    this.router.navigateByUrl(`/room/${chatRoom.uniqueId}`);
  }

  generateRoom(loginForm: object) {
    const loginRequest = this.api.apiPost('auth/login', loginForm);

    loginRequest.subscribe(resp => {
      if(resp.body){
        this.navigateToRoom(resp.body)
      }
    })
  }

  joinRoom(loginForm: object) {
    const loginRequest = this.api.apiPost('auth/login', loginForm);
    loginRequest.subscribe(resp => {
      if(resp.body){
        this.navigateToRoom(resp.body);
      }
    })
  }

  getChatRoom(id: string) {
    return this.api.apiGet('chatRoom/room', {"id": id});
  }

  getMessages(id: string){
    return this.api.apiGet('chatRoom/messages', {"id": id});
  }

  updateMessageArray(message:Message): Array<Message>{
    this.messages.push(message);
    return this.messages;
  }

  getUsers(id: string){
    return this.api.apiGet('chatRoom/users', {"id": id});
  }
}
