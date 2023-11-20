import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../interfaces/message';

@Component({
  selector: 'app-message-display',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="message-feed" #messageWindow>
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

