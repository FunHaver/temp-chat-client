import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SessionStorageService } from '../services/session-storage.service';

@Component({
  selector: 'app-mobile-room-controls',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal" (click)="toggleVisibility()">
      <div class="modal-container" (click)="$event.stopPropagation()">
        <div class="modal-head">
          <h1>Options</h1>
          <button (click)="toggleVisibility()" class="close-button">X</button>
        </div>
        <div class="modal-body room-control-modal">
          <button (click)="leaveRoom()" class="leave-button">Leave Room</button>
          <button (click)="copyRoomLink()" class="share-button">{{copyLinkMessage}}</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./mobile-room-controls.component.scss']
})
export class MobileRoomControlsComponent {
  @Input() visibilityBool!: boolean;
  @Output() roomVisChange = new EventEmitter<boolean>();
  copyLinkMessage: string;

  constructor(private router:Router, private sessionStorageService:SessionStorageService){
    this.copyLinkMessage = 'Copy Room Link';
  }

  toggleVisibility(){
    this.visibilityBool = !this.visibilityBool;
    this.roomVisChange.emit(this.visibilityBool);
  }

  copyRoomLink(){
    const origin = window.location.origin;
    const roomId = this.sessionStorageService.getSessionRoom()?.uniqueId;
    navigator.clipboard.writeText(`${origin}/join/${roomId}`);
    this.copyLinkMessage = 'Link Copied!';
    setTimeout(()=>{
      this.copyLinkMessage = 'Copy Room Link';
    }, 5000);
  }

  leaveRoom(){
    this.router.navigateByUrl("/");
    this.sessionStorageService.setSessionRoom(null);
    this.sessionStorageService.setSessionUser(null);
  }

}
