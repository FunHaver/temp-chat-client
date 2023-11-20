import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";
import { SessionStorageService } from '../services/session-storage.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header>
      <button (keydown.enter)="copyRoomLink()" (click)="leaveRoom()" class="room-control">Leave Room</button>
      <button (keydown.enter)="copyRoomLink()" (click)="copyRoomLink()" class="room-control">{{copyLinkMessage}}</button>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  copyLinkMessage: string;
  constructor(private router: Router, private sessionStorageService: SessionStorageService){
    this.copyLinkMessage = 'Copy Room Link';
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
