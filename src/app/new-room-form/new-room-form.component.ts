import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ChatRoomService } from '../services/chat-room.service';
import { FormValue } from '../interfaces/form-value';

@Component({
  selector: 'app-new-room-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <form [formGroup]="createRoomForm" (submit)="createRoom(createRoomForm.value)">
    <label for="createUsername">Username: </label>
    <input id="createUsername" type="text" formControlName="username">
    <input id="generateRoom" [hidden]="true" type="checkbox" formControName="generateRoom">
    <button class="major-button" type="submit">Create Room</button>
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

   
  createRoom(formValue: FormValue){
    if(typeof formValue.username === "string" && formValue.username.length > 0){
      this.chatRoomService.generateRoom(formValue);
    }
  }
}
