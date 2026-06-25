import { Component, ElementRef, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';

import { Message } from '../interfaces/message';
import { FormatTimestampPipe } from '../pipes/format-timestamp.pipe';

@Component({
    selector: 'app-message-display',
    imports: [FormatTimestampPipe],
    template: `
    <h2 class="room-name">Chat Room: {{roomName ? roomName : "Chat Room"}}</h2>
    <div class="message-feed" #messageWindow>
      @for (message of this.messages; track message; let i = $index) {
        <div class="message" [class.self]="message.userId === currentUserId">
          <div class="heading">
            <span class="author">{{message.user?.username}}</span>
            <span class="timestamp">{{message.creationTime | formatTimestamp}}</span>
          </div>
          <span class="content">{{message.content}}</span>
        </div>
      }
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./message-display.component.scss']
})
export class MessageDisplayComponent {
  @Input() messages!:Array<Message>
  @Input() roomName!:string;
  @Input() currentUserId!:string;

  @ViewChild("messageWindow", {static: false}) messageWindowRef: ElementRef<HTMLDivElement> | undefined;
  oldMessageLength: number = 0;
  constructor(){}
  
  ngAfterContentChecked(){
    if(this.oldMessageLength !== this.messages.length){

      setTimeout(() => {
        if(this.messageWindowRef){
          this.messageWindowRef.nativeElement.scrollTop = this.messageWindowRef.nativeElement.scrollHeight
        }}, 50);
    }
    this.oldMessageLength = this.messages.length;
  }
}

