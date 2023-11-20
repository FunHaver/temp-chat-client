import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../interfaces/message';

@Component({
  selector: 'app-message-display',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="message-feed">
     <div class="message" *ngFor="let message of this.messages; index as i;">
       <span class="author">{{message.user?.username}}</span>
       <span class="content">{{message.content}}</span>
      </div>
    </div>
  `,
  styleUrls: ['./message-display.component.scss']
})
export class MessageDisplayComponent {
  @Input() messages!:Array<Message>


}
