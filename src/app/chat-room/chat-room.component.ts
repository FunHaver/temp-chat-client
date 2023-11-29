import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomService } from '../services/chat-room.service';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';
import { Message } from '../interfaces/message';
import { SessionStorageService } from '../services/session-storage.service';
import { ChatRoom } from '../interfaces/chat-room';
import { MessageDisplayComponent } from '../message-display/message-display.component';
import { UsersDisplayComponent } from '../users-display/users-display.component';
import { User } from '../interfaces/user';
import { HeaderComponent } from '../header/header.component';
import { BadRoomComponent } from '../bad-room/bad-room.component';
@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [CommonModule, MessageDisplayComponent, UsersDisplayComponent, HeaderComponent, BadRoomComponent],
  template: `
  <div *ngIf="!badRoom" class="chat-room-container">
    <app-header class="chat-room-header-area" [users]="this.chatRoom.users" [webSocket]="this.webSocket"></app-header>
    <app-message-display class="message-feed-area" [roomName]="this.chatRoom.name" [messages]="this.chatRoom.messages"></app-message-display>
    <div class="users-list-area">
      <h2>Users List</h2>
    <app-users-display [users]="this.chatRoom.users"></app-users-display>
    </div>
    <div class="chat-input-area">
      <input class="message-input" type="text" #chatInput (keydown.enter)="submitMessage(chatInput)">
      <button class="send-message" type="button" (keydown.enter)="submitMessage(chatInput)" (click)="submitMessage(chatInput)" >Send</button>
    </div>
  
  </div>
  <app-bad-room *ngIf="badRoom"></app-bad-room>
  `,
  styleUrls: ['./chat-room.component.scss']
})

export class ChatRoomComponent {
  chatRoomService:ChatRoomService = inject(ChatRoomService);
  messageService:MessageService = inject(MessageService);
  chatRoom!:ChatRoom;
  user!:User;
  webSocket!:WebSocket;

  badRoom:boolean;
  constructor(private sessionStorageService:SessionStorageService, private router: Router){
    this.badRoom = false;
  }
  
  ngOnInit(){
    this.chatRoom = this.sessionStorageService.getSessionRoom() as ChatRoom;
    this.user = this.sessionStorageService.getSessionUser() as User;
    
    if(this.chatRoom === null || this.user === null){
      this.badRoom = true;
      return;
    }

    this.chatRoomService.getUsers(this.chatRoom.uniqueId).subscribe(result => {
      const users = result.body as Array<User>;
      if(users){
        this.chatRoom.users = users;
      } else {
        this.badRoom = true;
      }
    })
    this.chatRoomService.getMessages(this.chatRoom.uniqueId).subscribe(result => {
      const messages = result.body as Array<Message>;
      if(messages){
        this.chatRoom.messages = messages
      }
    })


    this.webSocket = new WebSocket(`ws://${window.location.host}:3001`);
    this.webSocket.onmessage = (event) => {
      let serverMessage = JSON.parse(event.data);
      if(Object.hasOwn(serverMessage, "USERLIST")){
        this.chatRoom.users = serverMessage["USERLIST"];
      } else if(Object.hasOwn(serverMessage, "CHAT")){
        this.chatRoom.messages.push(serverMessage["CHAT"]);
      }
    };

    const user = this.user;
    const webSocket = this.webSocket;
    this.webSocket.onopen = function(){
      webSocket.send(JSON.stringify({"ANNOUNCE": user}));
    }


  }
  
  async submitMessage(chatInput:HTMLInputElement){
    if(chatInput.value.length && chatInput.value.length > 0){
      let outgoingMessage: Message = this.messageService.validateMessage(this.sessionStorageService.getSessionUser()?.uniqueId, this.sessionStorageService.getSessionRoom()?.uniqueId, chatInput.value);
      outgoingMessage["user"] = this.user;
      this.messageService.postMessage(outgoingMessage, this.webSocket);
      chatInput.value = '';
    }
  }
}
