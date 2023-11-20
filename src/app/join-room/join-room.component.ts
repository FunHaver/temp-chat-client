import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinRoomFormComponent } from '../join-room-form/join-room-form.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-join-room',
  standalone: true,
  imports: [CommonModule, JoinRoomFormComponent],
  template: `
    <h1>Join a room!</h1>
    <app-join-room-form [roomId]="this.roomId"></app-join-room-form>
  `,
  styleUrls: ['./join-room.component.scss']
})
export class JoinRoomComponent {
  roomId: string | undefined;
  constructor(private route:ActivatedRoute){

  }

  ngOnInit(){
    const roomParam = this.route.snapshot.paramMap.get("id");
    if(roomParam !== null){
      this.roomId = roomParam;
    }  }
}
