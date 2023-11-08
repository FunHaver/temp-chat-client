import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { ChatRoom } from '../interfaces/chat-room';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {

  constructor(private api: RestApiService, private router: Router) { }
  
  generateRoom(loginForm: object) {
    const loginRequest = this.api.apiPost('auth/login', loginForm);

    loginRequest.subscribe(resp => {
      if(resp.body){
        let responseBody: any = resp.body;
        let chatRoom: ChatRoom = responseBody.chatRoom;
        let user: User = responseBody.user;
        sessionStorage.setItem("user", JSON.stringify(user));
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
