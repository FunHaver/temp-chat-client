import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ChatRoomService } from '../services/chat-room.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <form [formGroup]="loginForm" (submit)="chatRoomService.generateRoom(loginForm.value)">
    <label for="username">Username: </label>
    <input id="username" type="text" formControlName="username">
    <input id="generateRoom" [hidden]="true" type="checkbox" formControName="generateRoom">
    <button type="submit">Create Room</button>
</form>
  `,
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    generateRoom: new FormControl(true)
  })
  chatRoomService:ChatRoomService = inject(ChatRoomService);
}
