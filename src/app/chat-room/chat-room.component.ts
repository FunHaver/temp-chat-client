import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomService } from '../services/chat-room.service';
import { MessageService } from '../services/message.service';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../interfaces/message';
import { SessionStorageService } from '../services/session-storage.service';
import { ChatRoom } from '../interfaces/chat-room';
import { MessageDisplayComponent } from '../message-display/message-display.component';
import { UsersDisplayComponent } from '../users-display/users-display.component';
import { User } from '../interfaces/user';
import { RestApiService } from '../services/rest-api.service';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [CommonModule, MessageDisplayComponent, UsersDisplayComponent],
  template: `
    <app-message-display [messages]="this.chatRoom.messages"></app-message-display>
    
 
    <input type="text" #chatInput>
    <button type="button" (click)="submitMessage(chatInput)">Send</button>
    <app-users-display [users]="this.chatRoom.users"></app-users-display>
  `,
  styleUrls: ['./chat-room.component.scss']
})

export class ChatRoomComponent {
  chatRoomService:ChatRoomService = inject(ChatRoomService);
  messageService:MessageService = inject(MessageService);
  chatRoom!:ChatRoom;
  user!:User;
  webSocket!:WebSocket;

  constructor(private route:ActivatedRoute, private sessionStorageService:SessionStorageService, private api:RestApiService){
    
  }
  
  ngOnInit(){
    this.chatRoom = this.sessionStorageService.getSessionRoom() as ChatRoom;
    this.user = this.sessionStorageService.getSessionUser() as User;
    
    this.chatRoomService.getUsers(this.chatRoom.uniqueId).subscribe(result => {
      const users = result.body as Array<User>;
      if(users){
        this.chatRoom.users = users;
      }
    })
    this.chatRoomService.getMessages(this.chatRoom.uniqueId).subscribe(result => {
      const messages = result.body as Array<Message>;
      if(messages){
        this.chatRoom.messages = messages
      }
    })


    this.webSocket = new WebSocket('ws://localhost:3001/');
    this.webSocket.onmessage = (event) => {
      let serverMessage = JSON.parse(event.data);
      if(Object.hasOwn(serverMessage, "USERLIST")){
        this.chatRoom.users = serverMessage["USERLIST"];
      } else if(Object.hasOwn(serverMessage, "CHAT")){
        this.chatRoom.messages.push(serverMessage["CHAT"])
      }
    };

    const user = this.user;
    const webSocket = this.webSocket;
    this.webSocket.onopen = function(){
      webSocket.send(JSON.stringify({"ANNOUNCE": user}));
    }


  }
  
  async submitMessage(chatInput:HTMLInputElement){
    let outgoingMessage: Message = this.messageService.validateMessage(this.sessionStorageService.getSessionUser()?.uniqueId, this.sessionStorageService.getSessionRoom()?.uniqueId, chatInput.value);
    outgoingMessage["user"] = this.user;
    this.messageService.postMessage(outgoingMessage, this.webSocket);
    
    chatInput.value = '';
  }
}
