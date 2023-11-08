import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomService } from '../services/chat-room.service';
import { MessageService } from '../services/message.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route:ActivatedRoute){}
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
    this.messageService.postMessage(chatInput.value);
    chatInput.value = '';
  }
}
