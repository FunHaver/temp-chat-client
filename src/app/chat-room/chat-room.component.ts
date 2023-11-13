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
]import { RestApiService } from '../services/rest-api.service';

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
  serverSentService:ServerSentService = inject(ServerSentService);
  chatRoom!:ChatRoom;
  roomSubscription!: EventSource;
  constructor(private route:ActivatedRoute, private sessionStorageService:SessionStorageService, private api:RestApiService){
    
  }
  
  ngOnInit(){
    let id: string = '';
    this.route.params.forEach(member => {
      if(member["id"]){
        id = member["id"];
      }
    })
    this.chatRoom = this.sessionStorageService.getSessionRoom() as ChatRoom;
    this.chatRoomService.getUsers(id).subscribe(result => {
      const users = result.body as Array<User>;
      if(users){
        this.chatRoom.users = users;
      }
    })
    this.chatRoomService.getMessages(id).subscribe(result => {
      const messages = result.body as Array<Message>;
      if(messages){
        this.chatRoom.messages = messages
      }
    })
    this.roomSubscription = this.serverSentService.createEventSource(this.api.getRootUrl(), this.chatRoom.uniqueId, this.sessionStorageService.getSessionUser()?.uniqueId);
    if(this.roomSubscription.onmessage){
      this.roomSubscription.onmessage = function(event){
        console.log(event.data);
      }
    }
  }
  
  async submitMessage(chatInput:HTMLInputElement){
    let outgoingMessage: Message = this.messageService.validateMessage(this.sessionStorageService.getSessionUser()?.uniqueId, this.sessionStorageService.getSessionRoom()?.uniqueId, chatInput.value);
    let messagePostRequest = this.messageService.postMessage(outgoingMessage);
    messagePostRequest.subscribe(response => {
     //noop for now
    })
    chatInput.value = '';
  }
}
