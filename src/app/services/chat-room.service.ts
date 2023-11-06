import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { ChatRoom } from '../interfaces/chat-room';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

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
        this.router.navigateByUrl(`/room/${chatRoom.uniqueId}`);
      }

    })
  }
}
