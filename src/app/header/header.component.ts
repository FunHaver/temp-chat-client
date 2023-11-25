import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";
import { SessionStorageService } from '../services/session-storage.service';
import { User } from '../interfaces/user';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="full-width-header">
      <button (keydown.enter)="copyRoomLink()" (click)="leaveRoom()" class="header-button">Leave Room</button>
      <button (keydown.enter)="copyRoomLink()" (click)="copyRoomLink()" class="header-button">{{copyLinkMessage}}</button>
    </header>
    <header class="mobile-width-header">
      <button (keydown.enter)="showRoomControls()" (click)="showRoomControls()" class="header-button">Menu</button>
      <button (keydown.enter)="showUsers()" (click)="showUsers()" class="header-button">Users</button>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() users!:Array<User>
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

  showRoomControls(){
    
  }

  showUsers(){

  }
}
