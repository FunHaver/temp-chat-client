import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      chat-room works!
      {{chatRoomId}}
    </p>
  `,
  styleUrls: ['./chat-room.component.scss']
})

export class ChatRoomComponent {

  chatRoomId: string = ''
@Input()
set id(chatRoomId: string){
  this.chatRoomId = chatRoomId
}
}
