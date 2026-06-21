import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

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
import { MobileRoomControlsComponent } from '../modal/modal.component';
import dayjs from 'dayjs';
@Component({
    selector: 'app-chat-room',
    imports: [MessageDisplayComponent, UsersDisplayComponent, HeaderComponent, BadRoomComponent, MobileRoomControlsComponent],
    template: `
  @if (!badRoom) {
    <div class="chat-room-container">
      <app-header class="chat-room-header-area" [users]="this.chatRoom.users" [webSocket]="this.webSocket"></app-header>
      <app-message-display class="message-feed-area" [roomName]="this.chatRoom.name" [messages]="this.chatRoom.messages" [currentUserId]="this.user.uniqueId"></app-message-display>
      <div class="users-list-area">
        <h2>Users List</h2>
        <app-users-display [users]="this.chatRoom.users"></app-users-display>
      </div>
      <div class="chat-input-area">
        <input class="message-input" type="text" #chatInput (keydown.enter)="submitMessage(chatInput)">
        <button class="send-message" type="button" (keydown.enter)="submitMessage(chatInput)" (click)="submitMessage(chatInput)" >Send</button>
      </div>
    </div>
    @if (connectionLost) {
      <app-modal [visibilityBool]="connectionLost" [headerTitle]="'Connection Lost'" [hideCloseButton]="true">
        <p>Your connection to the chat room was lost.</p>
        <button (click)="leaveRoom()" class="leave-button">Leave Room</button>
      </app-modal>
    }
  }
  @if (badRoom) {
    <app-bad-room></app-bad-room>
  }
  `,
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./chat-room.component.scss']
})

export class ChatRoomComponent {
  chatRoomService:ChatRoomService = inject(ChatRoomService);
  messageService:MessageService = inject(MessageService);
  chatRoom!:ChatRoom;
  user!:User;
  webSocket!:WebSocket;

  badRoom:boolean;
  connectionLost:boolean;
  webSocketUrl: string;

  heartbeatTimeout: number = 10000;
  lastHeartbeat = dayjs()
  constructor(private sessionStorageService:SessionStorageService, private router: Router){
    this.badRoom = false;
    this.connectionLost = false;
    if(window.location.protocol.includes("https")){
      this.webSocketUrl = window.location.host.includes("localhost") ? "wss://localhost:3001" : `wss://${window.location.host}/ws`;
    } else {
      this.webSocketUrl = window.location.host.includes("localhost") ? "ws://localhost:3001" : `ws://${window.location.host}/ws`;
    }
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


    this.webSocket = new WebSocket(this.webSocketUrl);
    this.webSocket.onmessage = (event) => {
      let serverMessage = JSON.parse(event.data);
      if(Object.hasOwn(serverMessage, "USERLIST")){
        this.chatRoom.users = serverMessage["USERLIST"];
      } else if(Object.hasOwn(serverMessage, "CHAT")){
        this.chatRoom.messages.push(serverMessage["CHAT"]);
      } else if(Object.hasOwn(serverMessage,"HEARTBEAT")){
          this.lastHeartbeat = dayjs();
      }
    };

    const user = this.user;
    const webSocket = this.webSocket;
    this.webSocket.onopen = function(){
      webSocket.send(JSON.stringify({"ANNOUNCE": user}));
    }

    this.webSocket.onclose = (event) => {
      if (!event.wasClean) {
        this.connectionLost = true;
      }
    };

    setInterval(() => {
      if(Math.abs(this.lastHeartbeat.diff(dayjs())) > this.heartbeatTimeout){
        this.connectionLost = true;
      }
    }, 5001);
  }

  leaveRoom(){
    this.router.navigateByUrl('/');
    this.sessionStorageService.setSessionRoom(null);
    this.sessionStorageService.setSessionUser(null);
    this.webSocket.close();
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
