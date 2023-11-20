import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bad-room',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="error-message">
    <span>Error! You have either left the room or it no longer exists</span>
</div>
  `,
  styleUrls: ['./bad-room.component.scss']
})
export class BadRoomComponent {

}
