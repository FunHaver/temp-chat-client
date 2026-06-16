import { Component } from '@angular/core';


@Component({
    selector: 'app-bad-room',
    imports: [],
    template: `
  <div class="error-message">
    <span>Error! You have either left the room or it no longer exists</span>
</div>
  `,
    styleUrls: ['./bad-room.component.scss']
})
export class BadRoomComponent {

}
