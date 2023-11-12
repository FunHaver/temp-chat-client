import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../interfaces/message';

@Component({
  selector: 'app-message-display',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngFor="let message of this.messages; index as i;">
       <span>{{message.user?.username}} </span>
       <span>{{message.content}}</span>
    </div>
  `,
  styleUrls: ['./message-display.component.scss']
})
export class MessageDisplayComponent {
  @Input() messages!:Array<Message>


}
