import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomService } from '../services/chat-room.service';
import { MessageService } from '../services/message.service';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../interfaces/message';
import { SessionStorageService } from '../services/session-storage.service';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      chat-room works!
    </p>
    <input type="text" #chatInput>
    <button type="button" (click)="submitMessage(chatInput)">Send</button>
  `,
  styleUrls: ['./chat-room.component.scss']
})

export class ChatRoomComponent {
  chatRoomService:ChatRoomService = inject(ChatRoomService);
  messageService:MessageService = inject(MessageService);

  constructor(private route:ActivatedRoute, private sessionStorageService:SessionStorageService){}
  
  ngOnInit(){
    let id: string = '';
    this.route.params.forEach(member => {
      if(member["id"]){
        id = member["id"];
      }
    })
    this.chatRoomService.getChatRoom(id);
  }
  
  submitMessage(chatInput:HTMLInputElement){
    let outgoingMessage: Message = this.messageService.validateMessage(this.sessionStorageService.getSessionUser(), this.sessionStorageService.getSessionRoom(), chatInput.value);
    this.messageService.postMessage(outgoingMessage);
    chatInput.value = '';
  }
}
