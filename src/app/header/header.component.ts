import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";
import { SessionStorageService } from '../services/session-storage.service';
import { User } from '../interfaces/user';
import { UsersDisplayComponent } from '../users-display/users-display.component';
import { MobileRoomControlsComponent } from '../modal/modal.component';
@Component({
    selector: 'app-header',
    standalone: true,
    template: `
    <header class="full-width-header">
      <button (keydown.enter)="copyRoomLink()" (click)="leaveRoom()" class="header-button leave-button">Leave Room</button>
      <button (keydown.enter)="copyRoomLink()" (click)="copyRoomLink()" class="header-button share-button">{{copyLinkMessage}}</button>
    </header>
    <header class="mobile-width-header">
      <button (keydown.enter)="showRoomControls()" (click)="showRoomControls()" class="header-button mobile-button" aria-label="Open menu">
        <svg viewBox="0 0 100 80" width="40" height="40">
          <rect y="15" rx="5" width="100" height="7"></rect>
          <rect y="43" rx="5" width="100" height="7"></rect>
          <rect y="70" rx="5" width="100" height="7"></rect>
        </svg>
      </button>
      <button (keydown.enter)="showUsers()" (click)="showUsers()" class="header-button mobile-button" aria-label="Open users list">
      <svg class="svg-icon" viewBox="0 0 20 20">
							<path fill="none" d="M10,10.9c2.373,0,4.303-1.932,4.303-4.306c0-2.372-1.93-4.302-4.303-4.302S5.696,4.223,5.696,6.594C5.696,8.969,7.627,10.9,10,10.9z M10,3.331c1.801,0,3.266,1.463,3.266,3.263c0,1.802-1.465,3.267-3.266,3.267c-1.8,0-3.265-1.465-3.265-3.267C6.735,4.794,8.2,3.331,10,3.331z"></path>
							<path fill="none" d="M10,12.503c-4.418,0-7.878,2.058-7.878,4.685c0,0.288,0.231,0.52,0.52,0.52c0.287,0,0.519-0.231,0.519-0.52c0-1.976,3.132-3.646,6.84-3.646c3.707,0,6.838,1.671,6.838,3.646c0,0.288,0.234,0.52,0.521,0.52s0.52-0.231,0.52-0.52C17.879,14.561,14.418,12.503,10,12.503z"></path>
			</svg>
      </button>
    </header>
    <app-modal *ngIf="roomControlsVisible" [visibilityBool]="roomControlsVisible" (modalVisChange)="roomControlsVisible=$event" [headerTitle]="'Options'">
        <div class="room-controls-modal">
          <button (click)="leaveRoom()" class="leave-button">Leave Room</button>
          <button (click)="copyRoomLink()" class="share-button">{{copyLinkMessage}}</button>
        </div>
    </app-modal>
    <app-modal *ngIf="userListVisible" [visibilityBool]="userListVisible" (modalVisChange)="userListVisible=$event" [headerTitle]="'Users List'"> 
        <app-users-display class="users-list-modal" [users]="this.users"></app-users-display>
    </app-modal>
  `,
    styleUrls: ['./header.component.scss'],
    imports: [CommonModule, MobileRoomControlsComponent, UsersDisplayComponent]
})
export class HeaderComponent {
  @Input() users!:Array<User>
  @Input() webSocket!: WebSocket;

  copyLinkMessage: string;
  roomControlsVisible: boolean;
  userListVisible: boolean;
  constructor(private router: Router, private sessionStorageService: SessionStorageService){
    this.copyLinkMessage = 'Copy Room Link';
    this.roomControlsVisible = false;
    this.userListVisible = false;
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
    this.webSocket.close();
  }

  showRoomControls(){
    this.roomControlsVisible = !this.roomControlsVisible;
  }

  showUsers(){
    this.userListVisible = !this.userListVisible;
  }
}
