import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ChatRoomService } from '../services/chat-room.service';

@Component({
  selector: 'app-new-room-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <form [formGroup]="createRoomForm" (submit)="chatRoomService.generateRoom(createRoomForm.value)">
    <label for="createUsername">Username: </label>
    <input id="createUsername" type="text" formControlName="username">
    <input id="generateRoom" [hidden]="true" type="checkbox" formControName="generateRoom">
    <button type="submit">Create Room</button>
</form>
  `,
  styleUrls: ['./new-room-form.component.scss']
})
export class NewRoomFormComponent {
  createRoomForm = new FormGroup({
    username: new FormControl(''),
    generateRoom: new FormControl(true)
  })
  chatRoomService:ChatRoomService = inject(ChatRoomService);
}
