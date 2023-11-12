import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChatRoomService } from '../services/chat-room.service';

@Component({
  selector: 'app-join-room-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <form [formGroup]="joinRoomForm" (submit)="chatRoomService.joinRoom(joinRoomForm.value)">
    <label for="joinUsername">Username: </label>
    <input id="joinUsername" type="text" formControlName="username">
    <label for="roomId">Room Id: </label>
    <input id="roomId" type="text" formControlName="chatRoomId">

    <button type="submit">Join Room</button>
</form>
  `,
  styleUrls: ['./join-room-form.component.scss']
})
export class JoinRoomFormComponent {
  joinRoomForm = new FormGroup({
    username: new FormControl(''),
    chatRoomId: new FormControl(''),
    generateRoom: new FormControl(false)
  })
  chatRoomService:ChatRoomService = inject(ChatRoomService);
}
