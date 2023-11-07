import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomService } from '../services/chat-room.service';
import { MessageService } from '../services/message.service';
@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      chat-room works!
      {{chatRoomId}}
    </p>
    <input type="text" #chatInput>
    <button type="button" (click)="submitMessage(chatInput)">Send</button>
  `,
  styleUrls: ['./chat-room.component.scss']
})

export class ChatRoomComponent {
  chatRoomService:ChatRoomService = inject(ChatRoomService);
  messageService:MessageService = inject(MessageService);
  chatRoomId: string = ''
  @Input()
  set id(chatRoomId: string){
    this.chatRoomId = chatRoomId
  }

  
  submitMessage(chatInput:HTMLInputElement){
    this.messageService.postMessage(chatInput.value);
    chatInput.value = '';
  }
}
