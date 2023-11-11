import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { ChatRoom } from '../interfaces/chat-room';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {
  
  constructor(private api: RestApiService, private sessionStorageService: SessionStorageService, private router: Router) { 

  }
  
  generateRoom(loginForm: object) {
    const loginRequest = this.api.apiPost('auth/login', loginForm);

    loginRequest.subscribe(resp => {
      if(resp.body){
        let responseBody: any = resp.body;
        let chatRoom: ChatRoom = responseBody.chatRoom;
        let user: User = responseBody.user;
        this.sessionStorageService.setSessionUser(user);
        this.sessionStorageService.setSessionRoom(chatRoom);
        this.router.navigateByUrl(`/room/${chatRoom.uniqueId}`);
      }
    })
  }

  getChatRoom(chatRoomId: string) {
    const getChatRoom = this.api.apiGet('chatRoom/', {"id": chatRoomId});
    getChatRoom.subscribe(resp => {
      console.log(resp);
    })
  }
}
