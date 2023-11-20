import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewRoomFormComponent } from '../new-room-form/new-room-form.component';
import { RestApiService } from '../services/rest-api.service';
import { JoinRoomFormComponent } from '../join-room-form/join-room-form.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
            NewRoomFormComponent,
            JoinRoomFormComponent],
  template: `
  <div class="home-page-container">
    <h1 class="app-title">Temp Chat</h1>

    <app-new-room-form class="sign-in-form" *ngIf="!showJoinForm"></app-new-room-form>
    <button class="toggle-form-button" (click)="toggleRoomForm()" *ngIf="!showJoinForm">Join Existing Room</button>
    <app-join-room-form class="sign-in-form" *ngIf="showJoinForm"></app-join-room-form>
    <button class="toggle-form-button" (click)="toggleRoomForm()" *ngIf="showJoinForm">Create New Room</button>
  </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  api: RestApiService = inject(RestApiService);
  showJoinForm: boolean;

  constructor(){
    this.showJoinForm = false;
  }
  
  toggleRoomForm = () => {
    this.showJoinForm = !this.showJoinForm;
  }
}
