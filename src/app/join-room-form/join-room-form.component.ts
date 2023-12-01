//@ts-nocheck
import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChatRoomService } from '../services/chat-room.service';
import { SessionStorageService } from '../services/session-storage.service';
@Component({
  selector: 'app-join-room-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <form [formGroup]="joinRoomForm" (submit)="joinRoom(joinRoomForm.value)">
    <span>{{this.joinError}}</span>
    <label for="joinUsername">Username: </label>
    <input id="joinUsername" type="text" formControlName="username">
    <label for="roomId">Room Id: </label>
    <input id="roomId" type="text" formControlName="chatRoomId">

    <button class="major-button" type="submit">Join Room</button>
</form>
  `,
  styleUrls: ['./join-room-form.component.scss']
})
export class JoinRoomFormComponent {
  @Input() roomId: string | undefined = '';
  joinRoomForm = new FormGroup({
    username: new FormControl(''),
    chatRoomId: new FormControl(this.roomId),
    generateRoom: new FormControl(false)
  })

  joinError: string;


  constructor(private sessionStorageService: SessionStorageService){
    this.joinError = ''
  }
  ngOnInit(){
    this.joinRoomForm.setValue({
      username: '',
      chatRoomId: this.roomId,
      generateRoom: false
    })
  }

  joinRoom(formValue: object){
    if(typeof formValue.username === "string" && formValue.username.length > 0){

    
    this.chatRoomService.joinRoom(formValue).subscribe( resp => {
      if(resp.body){
        if(resp.body.error){
          this.joinError = resp.body.error;
          
        } else {
          this.sessionStorageService.removeSessionStorage();
          this.chatRoomService.navigateToRoom(resp.body);
        }
      }
    }, err => {
      if(err === "404"){
        this.joinError = "Room not found";
      }
    })
  } else {
    this.joinError = "Username must be at least one character long"
  }
  }
  chatRoomService:ChatRoomService = inject(ChatRoomService);
}
